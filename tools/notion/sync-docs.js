#!/usr/bin/env node

/**
 * Documentation Sync Script
 * Syncs docs/ folder to Notion Engineering Docs database
 */

const { notionHelpers, NOTION_CONFIG, notion } = require("./config");
const fs = require("fs");
const path = require("path");

// Cache file to track sync status
const SYNC_CACHE_FILE = path.join(__dirname, ".sync-cache.json");

// Load sync cache to track last sync times
function loadSyncCache() {
  try {
    if (fs.existsSync(SYNC_CACHE_FILE)) {
      return JSON.parse(fs.readFileSync(SYNC_CACHE_FILE, "utf8"));
    }
  } catch (error) {
    console.log("⚠️  Could not load sync cache, will sync all files");
  }
  return {};
}

// Save sync cache
function saveSyncCache(cache) {
  try {
    fs.writeFileSync(SYNC_CACHE_FILE, JSON.stringify(cache, null, 2));
  } catch (error) {
    console.log("⚠️  Could not save sync cache:", error.message);
  }
}

// Check if file needs syncing
function checkIfFileNeedsSync(file, existingPages, syncCache) {
  const fileName = file.name;
  const fileLastModified = file.lastModified.getTime();
  const fileSize = file.size;

  // Check if file exists in cache
  const cachedFile = syncCache[fileName];

  // Always sync if not in cache
  if (!cachedFile) {
    return { shouldSync: true, reason: "new file" };
  }

  // Check if file was modified since last sync
  if (fileLastModified > cachedFile.lastSynced) {
    return { shouldSync: true, reason: "file modified" };
  }

  // Check if file size changed
  if (fileSize !== cachedFile.size) {
    return { shouldSync: true, reason: "size changed" };
  }

  // Check if page exists in Notion (might have been deleted)
  const title = getDocumentTitle(file.path);
  const existingPage = existingPages.find((page) => {
    const pageTitle = page.properties?.["Doc name"]?.title?.[0]?.plain_text;
    return pageTitle === title;
  });

  if (!existingPage) {
    return { shouldSync: true, reason: "page missing in Notion" };
  }

  // File is up to date
  return { shouldSync: false };
}

// Get document title from file
function getDocumentTitle(filePath) {
  try {
    const content = fs.readFileSync(filePath, "utf8");
    const lines = content.split("\n");
    return lines[0].replace(/^#\s+/, "") || path.basename(filePath, ".md");
  } catch (error) {
    return path.basename(filePath, ".md");
  }
}

// Convert markdown content to Notion blocks
function convertMarkdownToNotionBlocks(content) {
  const lines = content.split("\n");
  const blocks = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();

    if (!line) {
      // Skip empty lines
      continue;
    }

    // Handle headings
    if (line.startsWith("# ")) {
      blocks.push({
        object: "block",
        type: "heading_1",
        heading_1: {
          rich_text: [
            {
              type: "text",
              text: { content: line.substring(2).substring(0, 2000) },
            },
          ],
        },
      });
    } else if (line.startsWith("## ")) {
      blocks.push({
        object: "block",
        type: "heading_2",
        heading_2: {
          rich_text: [
            {
              type: "text",
              text: { content: line.substring(3).substring(0, 2000) },
            },
          ],
        },
      });
    } else if (line.startsWith("### ")) {
      blocks.push({
        object: "block",
        type: "heading_3",
        heading_3: {
          rich_text: [
            {
              type: "text",
              text: { content: line.substring(4).substring(0, 2000) },
            },
          ],
        },
      });
    } else if (line.startsWith("```")) {
      // Handle code blocks with length limits
      const codeLines = [];
      let language = line.substring(3).trim() || "plain text";

      // Map unsupported languages to supported ones
      const languageMap = {
        tsx: "typescript",
        jsx: "javascript",
        ts: "typescript",
        js: "javascript",
        sh: "shell",
        zsh: "shell",
        fish: "shell",
        vue: "html",
        svelte: "html",
        astro: "html",
      };

      if (languageMap[language]) {
        language = languageMap[language];
      }

      i++; // Skip the opening ```

      while (i < lines.length && !lines[i].trim().startsWith("```")) {
        codeLines.push(lines[i]);
        i++;
      }

      const codeContent = codeLines.join("\n");

      // Split long code blocks into multiple blocks
      if (codeContent.length > 1900) {
        // Leave some buffer
        const chunks = splitTextIntoChunks(codeContent, 1900);
        chunks.forEach((chunk, index) => {
          blocks.push({
            object: "block",
            type: "code",
            code: {
              rich_text: [{ type: "text", text: { content: chunk } }],
              language: language,
            },
          });

          // Add a small separator comment for continuation
          if (index < chunks.length - 1) {
            blocks.push({
              object: "block",
              type: "paragraph",
              paragraph: {
                rich_text: [
                  { type: "text", text: { content: "// ... continued ..." } },
                ],
              },
            });
          }
        });
      } else {
        blocks.push({
          object: "block",
          type: "code",
          code: {
            rich_text: [{ type: "text", text: { content: codeContent } }],
            language: language,
          },
        });
      }
    } else if (line.startsWith("- ") || line.startsWith("* ")) {
      // Handle bullet points
      const bulletContent = line.substring(2).substring(0, 2000);
      blocks.push({
        object: "block",
        type: "bulleted_list_item",
        bulleted_list_item: {
          rich_text: [{ type: "text", text: { content: bulletContent } }],
        },
      });
    } else {
      // Regular paragraph - split if too long
      const paragraphContent = line.substring(0, 2000);
      blocks.push({
        object: "block",
        type: "paragraph",
        paragraph: {
          rich_text: [{ type: "text", text: { content: paragraphContent } }],
        },
      });
    }
  }

  return blocks;
}

// Helper function to split text into chunks
function splitTextIntoChunks(text, maxLength) {
  const chunks = [];
  let currentChunk = "";
  const lines = text.split("\n");

  for (const line of lines) {
    if (currentChunk.length + line.length + 1 > maxLength) {
      if (currentChunk) {
        chunks.push(currentChunk);
        currentChunk = line;
      } else {
        // Single line is too long, split it
        chunks.push(line.substring(0, maxLength));
        currentChunk = line.substring(maxLength);
      }
    } else {
      currentChunk += (currentChunk ? "\n" : "") + line;
    }
  }

  if (currentChunk) {
    chunks.push(currentChunk);
  }

  return chunks;
}

// Generate comprehensive document summary
function generateDocumentSummary(content, filename) {
  const lines = content
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line);

  // Extract key information
  const summaryParts = [];

  // Find the first substantial paragraph (not title, not metadata)
  let firstParagraph = "";
  let foundFirstParagraph = false;

  for (let i = 1; i < lines.length && !foundFirstParagraph; i++) {
    const line = lines[i];

    // Skip headers, metadata, and formatting
    if (
      line.startsWith("#") ||
      line.startsWith("**") ||
      line.startsWith("---") ||
      line.startsWith("```") ||
      line.startsWith(">") ||
      line.includes("Last Updated:") ||
      line.includes("Version:") ||
      line.includes("Status:") ||
      line.length < 20
    ) {
      continue;
    }

    // Found a substantial paragraph
    if (line.length > 20) {
      firstParagraph = line.replace(/[#*`]/g, "").trim();
      foundFirstParagraph = true;
    }
  }

  if (firstParagraph) {
    summaryParts.push(firstParagraph);
  }

  // Extract key features or sections
  const keyFeatures = [];
  const importantSections = [];

  for (const line of lines) {
    // Look for feature lists
    if (line.startsWith("- ✅") || line.startsWith("* ✅")) {
      const feature = line
        .replace(/^[-*]\s*✅\s*/, "")
        .replace(/[*`]/g, "")
        .trim();
      if (feature.length > 10 && feature.length < 100) {
        keyFeatures.push(feature);
      }
    }

    // Look for important sections
    if (
      line.startsWith("## ") &&
      !line.includes("Overview") &&
      !line.includes("Introduction")
    ) {
      const section = line
        .replace(/^##\s*/, "")
        .replace(/[#*`]/g, "")
        .trim();
      if (section.length < 50) {
        importantSections.push(section);
      }
    }
  }

  // Add key features to summary
  if (keyFeatures.length > 0) {
    const featuresText = keyFeatures.slice(0, 3).join(", ");
    summaryParts.push(`Key features: ${featuresText}`);
  }

  // Add important sections
  if (importantSections.length > 0) {
    const sectionsText = importantSections.slice(0, 3).join(", ");
    summaryParts.push(`Covers: ${sectionsText}`);
  }

  // Determine document type and add context
  let docType = "Documentation";
  if (filename.includes("README")) docType = "Project guide";
  if (filename.includes("QUICK_START")) docType = "Quick start guide";
  if (filename.includes("API")) docType = "API documentation";
  if (filename.includes("DOCKER")) docType = "Docker setup guide";
  if (filename.includes("MIGRATION")) docType = "Migration guide";
  if (filename.includes("ENTERPRISE")) docType = "Enterprise strategy";
  if (filename.includes("EXPO")) docType = "Mobile development guide";
  if (filename.includes("GIT")) docType = "Git workflow guide";
  if (filename.includes("STATUS")) docType = "Project status report";
  if (filename.includes("REACT")) docType = "React upgrade guide";

  // Combine all parts
  let summary = summaryParts.join(". ");

  // Add document type context if summary is short
  if (summary.length < 100) {
    summary = `${docType}: ${summary}`;
  }

  // Ensure summary is not too long
  if (summary.length > 500) {
    summary = summary.substring(0, 497) + "...";
  }

  // Fallback if no good summary found
  if (summary.length < 20) {
    summary = `${docType} for EV Charging Admin project - ${filename.replace(
      ".md",
      ""
    )}`;
  }

  return summary;
}

// Update page content by replacing all blocks
async function updatePageContent(pageId, newBlocks) {
  try {
    // First, get existing blocks
    const existingBlocks = await notion.blocks.children.list({
      block_id: pageId,
    });

    // Delete existing blocks
    for (const block of existingBlocks.results) {
      try {
        await notion.blocks.delete({ block_id: block.id });
      } catch (error) {
        console.log(`   ⚠️  Could not delete block: ${error.message}`);
      }
    }

    // Add new blocks in batches (Notion API limit is 100 blocks per request)
    const batchSize = 100;
    for (let i = 0; i < newBlocks.length; i += batchSize) {
      const batch = newBlocks.slice(i, i + batchSize);
      await notion.blocks.children.append({
        block_id: pageId,
        children: batch,
      });
    }
  } catch (error) {
    console.error(`Failed to update page content: ${error.message}`);
    throw error;
  }
}

async function syncDocumentationToNotion() {
  console.log("📚 Syncing documentation to Notion...\n");

  try {
    // Test connection first
    const connected = await notionHelpers.testConnection();
    if (!connected) {
      throw new Error("Cannot connect to Notion");
    }

    // Get docs directory
    const docsPath = path.join(__dirname, "../../docs");
    if (!fs.existsSync(docsPath)) {
      throw new Error(`Docs directory not found: ${docsPath}`);
    }

    // Get markdown files with their modification times
    const files = fs
      .readdirSync(docsPath)
      .filter((file) => file.endsWith(".md"))
      .map((file) => {
        const filePath = path.join(docsPath, file);
        const stats = fs.statSync(filePath);
        return {
          name: file,
          path: filePath,
          lastModified: stats.mtime,
          size: stats.size,
        };
      });

    console.log(`📄 Found ${files.length} documentation files`);

    // Get existing pages in Engineering Docs database
    const existingPages = await notionHelpers.queryDatabase(
      NOTION_CONFIG.databases.engineeringDocs
    );
    console.log(`📋 Found ${existingPages.length} existing pages in Notion`);

    // Load sync cache to track last sync times
    const syncCache = loadSyncCache();

    // Check which files need syncing
    const filesToSync = [];
    const skippedFiles = [];

    for (const file of files) {
      const needsSync = checkIfFileNeedsSync(file, existingPages, syncCache);
      if (needsSync.shouldSync) {
        filesToSync.push({ ...file, reason: needsSync.reason });
      } else {
        skippedFiles.push(file.name);
      }
    }

    console.log(`🔄 Files to sync: ${filesToSync.length}`);
    console.log(`⏭️  Files skipped (up to date): ${skippedFiles.length}`);

    if (skippedFiles.length > 0) {
      console.log(`   Skipped: ${skippedFiles.join(", ")}`);
    }
    console.log();

    // Sync only the files that need updating
    for (const file of filesToSync) {
      console.log(`🔄 Processing ${file.name}... (${file.reason})`);

      try {
        const filePath = file.path;
        const content = fs.readFileSync(filePath, "utf8");
        const stats = fs.statSync(filePath);

        // Extract title from first line or use filename
        const lines = content.split("\n");
        const title = lines[0].replace(/^#\s+/, "") || file.name.replace(".md", "");

        // Determine category based on filename
        let category = "Development";
        if (file.name.includes("EXPO") || file.name.includes("MOBILE"))
          category = "Mobile";
        if (file.name.includes("DOCKER") || file.name.includes("DEPLOY"))
          category = "Deployment";
        if (file.name.includes("ARCHITECTURE") || file.name.includes("ENTERPRISE"))
          category = "Architecture";
        if (file.name.includes("API")) category = "API";
        if (file.name.includes("ROADMAP") || file.name.includes("PLAN"))
          category = "Planning";

        // Check if page already exists
        const existingPage = existingPages.find((page) => {
          const pageTitle =
            page.properties?.["Doc name"]?.title?.[0]?.plain_text;
          return pageTitle === title;
        });

        // Create a comprehensive summary from document content
        const summary = generateDocumentSummary(content, file.name);

        // Get file stats for metadata
        const fileSize = Math.round(stats.size / 1024); // Size in KB
        const lastModified = stats.mtime.toISOString().split("T")[0];

        // Prepare page properties
        const properties = {
          "Doc name": {
            title: [{ text: { content: title } }],
          },
          Category: {
            multi_select: [{ name: category }],
          },
          Status: {
            status: { name: "Published" },
          },
          Summary: {
            rich_text: [
              { text: { content: summary || `Documentation file: ${file}` } },
            ],
          },
        };

        // Convert markdown content to Notion blocks
        const contentBlocks = convertMarkdownToNotionBlocks(content);

        if (existingPage) {
          // Update existing page properties and content
          await notionHelpers.updatePage(existingPage.id, properties);
          await updatePageContent(existingPage.id, contentBlocks);
          console.log(
            `   ✅ Updated: ${title} (${fileSize}KB, ${contentBlocks.length} blocks, modified ${lastModified})`
          );
        } else {
          // Create new page with content
          const newPage = await notionHelpers.createPage(
            NOTION_CONFIG.databases.engineeringDocs,
            properties
          );
          if (newPage && contentBlocks.length > 0) {
            await updatePageContent(newPage.id, contentBlocks);
          }
          console.log(
            `   ✅ Created: ${title} (${fileSize}KB, ${contentBlocks.length} blocks)`
          );
        }

        // Update sync cache for this file
        syncCache[file.name] = {
          lastSynced: Date.now(),
          size: file.size,
          lastModified: file.lastModified.getTime(),
          title: title
        };

      } catch (error) {
        console.log(`   ❌ Failed: ${error.message}`);
      }
    }

    // Save updated sync cache
    saveSyncCache(syncCache);

    console.log("\n🎉 Documentation sync completed!");
    console.log(`📊 Processed ${filesToSync.length} files (${skippedFiles.length} skipped)`);
  } catch (error) {
    console.error("❌ Sync failed:", error.message);
    process.exit(1);
  }
}

if (require.main === module) {
  syncDocumentationToNotion();
}

module.exports = { syncDocumentationToNotion };
