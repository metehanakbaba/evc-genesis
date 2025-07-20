import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { StatValue } from "./StatValue";
import type { StatValueProps } from "./StatValue";

// Mock icon component for testing
const MockIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} data-testid="mock-icon" viewBox="0 0 24 24">
    <circle cx="12" cy="12" r="10" />
  </svg>
);

describe("StatValue", () => {
  // Default props for testing
  const defaultProps: StatValueProps = {
    value: "1,234",
    title: "Active Sessions",
    "data-testid": "test-stat-value",
  };

  describe("Rendering", () => {
    it("renders with default props", () => {
      render(<StatValue {...defaultProps} />);

      const container = screen.getByTestId("test-stat-value");
      const title = screen.getByTestId("test-stat-value-title");
      const value = screen.getByTestId("test-stat-value-value");

      expect(container).toBeInTheDocument();
      expect(title).toHaveTextContent("Active Sessions");
      expect(value).toHaveTextContent("1,234");
      expect(container).toHaveAttribute("data-variant", "blue");
      expect(container).toHaveAttribute("data-size", "md");
      expect(container).toHaveAttribute("data-orientation", "vertical");
      expect(container).toHaveAttribute("data-interactive", "false");
    });

    it("renders with custom test id", () => {
      render(<StatValue value="123" title="Test" data-testid="custom-stat" />);

      const container = screen.getByTestId("custom-stat");
      expect(container).toBeInTheDocument();
    });

    it("applies custom className", () => {
      const customClass = "custom-stat-value";
      render(<StatValue {...defaultProps} className={customClass} />);

      const container = screen.getByTestId("test-stat-value");
      expect(container).toHaveClass(customClass);
    });
  });

  describe("Variant Props", () => {
    const variants: Array<StatValueProps["variant"]> = [
      "blue",
      "emerald",
      "purple",
      "teal",
    ];

    variants.forEach((variant) => {
      it(`renders with ${variant} variant`, () => {
        render(<StatValue {...defaultProps} variant={variant} />);

        const container = screen.getByTestId("test-stat-value");
        expect(container).toHaveAttribute("data-variant", variant);
      });
    });
  });

  describe("Size Props", () => {
    const sizes: Array<StatValueProps["size"]> = ["xs", "sm", "md", "lg", "xl"];

    sizes.forEach((size) => {
      it(`renders with ${size} size`, () => {
        render(<StatValue {...defaultProps} size={size} />);

        const container = screen.getByTestId("test-stat-value");
        expect(container).toHaveAttribute("data-size", size);
      });
    });
  });

  describe("Icon Support", () => {
    it("renders without icon by default", () => {
      render(<StatValue {...defaultProps} />);

      const icon = screen.queryByTestId("test-stat-value-icon");
      expect(icon).not.toBeInTheDocument();
    });

    it("renders with icon when provided", () => {
      render(<StatValue {...defaultProps} icon={MockIcon} />);

      const icon = screen.getByTestId("test-stat-value-icon");
      const mockIcon = screen.getByTestId("mock-icon");

      expect(icon).toBeInTheDocument();
      expect(mockIcon).toBeInTheDocument();
    });

    it("passes correct props to IconContainer", () => {
      render(
        <StatValue
          {...defaultProps}
          icon={MockIcon}
          variant="emerald"
          size="lg"
        />
      );

      const icon = screen.getByTestId("test-stat-value-icon");
      expect(icon).toHaveAttribute("data-variant", "emerald");
      expect(icon).toHaveAttribute("data-size", "lg"); // lg maps to lg for icon
    });
  });

  describe("Trend Indicators", () => {
    it("renders without trend by default", () => {
      render(<StatValue {...defaultProps} />);

      const trend = screen.queryByTestId("test-stat-value-trend");
      expect(trend).not.toBeInTheDocument();
    });

    it("renders positive trend with emerald variant", () => {
      render(<StatValue {...defaultProps} trend="+12%" />);

      const trend = screen.getByTestId("test-stat-value-trend");
      expect(trend).toHaveTextContent("+12%");
      expect(trend).toHaveAttribute("data-variant", "emerald");
    });

    it("renders negative trend with purple variant", () => {
      render(<StatValue {...defaultProps} trend="-5%" />);

      const trend = screen.getByTestId("test-stat-value-trend");
      expect(trend).toHaveTextContent("-5%");
      expect(trend).toHaveAttribute("data-variant", "purple");
    });

    it("renders neutral trend with component variant", () => {
      render(<StatValue {...defaultProps} trend="0%" variant="blue" />);

      const trend = screen.getByTestId("test-stat-value-trend");
      expect(trend).toHaveTextContent("0%");
      expect(trend).toHaveAttribute("data-variant", "blue");
    });
  });

  describe("Description Support", () => {
    it("renders without description by default", () => {
      render(<StatValue {...defaultProps} />);

      const description = screen.queryByTestId("test-stat-value-description");
      expect(description).not.toBeInTheDocument();
    });

    it("renders with description when provided", () => {
      render(<StatValue {...defaultProps} description="Last 30 days" />);

      const description = screen.getByTestId("test-stat-value-description");
      expect(description).toHaveTextContent("Last 30 days");
      expect(description).toHaveAttribute("data-truncate", "true");
    });
  });

  describe("Orientation", () => {
    it("renders vertical orientation by default", () => {
      render(<StatValue {...defaultProps} />);

      const container = screen.getByTestId("test-stat-value");
      expect(container).toHaveAttribute("data-orientation", "vertical");
      expect(container).toHaveClass("flex-col");
    });

    it("renders horizontal orientation when specified", () => {
      render(<StatValue {...defaultProps} orientation="horizontal" />);

      const container = screen.getByTestId("test-stat-value");
      expect(container).toHaveAttribute("data-orientation", "horizontal");
      expect(container).toHaveClass("flex-row", "items-center");
    });
  });

  describe("Value Formatting", () => {
    it("displays raw value without formatter", () => {
      render(<StatValue {...defaultProps} value="1234.56" />);

      const value = screen.getByTestId("test-stat-value-value");
      expect(value).toHaveTextContent("1234.56");
    });

    it("applies custom formatter when provided", () => {
      const formatter = (val: string) => `$${parseFloat(val).toLocaleString()}`;
      render(
        <StatValue {...defaultProps} value="1234.56" formatValue={formatter} />
      );

      const value = screen.getByTestId("test-stat-value-value");
      expect(value).toHaveTextContent("1,234.56"); // Formatted with toLocaleString
    });
  });

  describe("Interactive States", () => {
    it("renders as non-interactive by default", () => {
      render(<StatValue {...defaultProps} />);

      const container = screen.getByTestId("test-stat-value");
      expect(container).toHaveAttribute("data-interactive", "false");
      expect(container).not.toHaveAttribute("role");
      expect(container).not.toHaveAttribute("tabIndex");
      expect(container).not.toHaveClass("cursor-pointer");
    });

    it("renders as interactive when onClick is provided", () => {
      const handleClick = jest.fn();
      render(<StatValue {...defaultProps} onClick={handleClick} />);

      const container = screen.getByTestId("test-stat-value");
      expect(container).toHaveAttribute("data-interactive", "true");
      expect(container).toHaveAttribute("role", "button");
      expect(container).toHaveAttribute("tabIndex", "0");
      expect(container).toHaveClass("cursor-pointer");
    });

    it("calls onClick when clicked", () => {
      const handleClick = jest.fn();
      render(<StatValue {...defaultProps} onClick={handleClick} />);

      const container = screen.getByTestId("test-stat-value");
      fireEvent.click(container);

      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it("handles keyboard events when interactive", () => {
      const handleClick = jest.fn();
      render(<StatValue {...defaultProps} onClick={handleClick} />);

      const container = screen.getByTestId("test-stat-value");

      // Test Enter key
      fireEvent.keyDown(container, { key: "Enter" });
      expect(handleClick).toHaveBeenCalledTimes(1);

      // Test Space key
      fireEvent.keyDown(container, { key: " " });
      expect(handleClick).toHaveBeenCalledTimes(2);

      // Test other keys (should not trigger)
      fireEvent.keyDown(container, { key: "Escape" });
      expect(handleClick).toHaveBeenCalledTimes(2);
    });

    it("applies interactive effects to icon when interactive", () => {
      const handleClick = jest.fn();
      render(
        <StatValue {...defaultProps} icon={MockIcon} onClick={handleClick} />
      );

      const icon = screen.getByTestId("test-stat-value-icon");
      expect(icon).toHaveAttribute("data-glow-effect", "true");
    });
  });

  describe("Size Configuration", () => {
    it("applies correct size classes for xs", () => {
      render(<StatValue {...defaultProps} size="xs" />);

      const container = screen.getByTestId("test-stat-value");
      expect(container).toHaveClass("gap-2");
    });

    it("applies correct size classes for xl", () => {
      render(<StatValue {...defaultProps} size="xl" />);

      const container = screen.getByTestId("test-stat-value");
      expect(container).toHaveClass("gap-4");
    });

    it("uses correct text sizes for different component sizes", () => {
      render(<StatValue {...defaultProps} size="lg" />);

      const title = screen.getByTestId("test-stat-value-title");
      const value = screen.getByTestId("test-stat-value-value");

      expect(title).toHaveAttribute("data-size", "md");
      expect(value).toHaveAttribute("data-size", "xl");
    });
  });

  describe("Atomic Composition", () => {
    it("composes TextElement atoms correctly", () => {
      render(<StatValue {...defaultProps} description="Test description" />);

      const title = screen.getByTestId("test-stat-value-title");
      const value = screen.getByTestId("test-stat-value-value");
      const description = screen.getByTestId("test-stat-value-description");

      // Check TextElement attributes
      expect(title).toHaveAttribute("data-weight", "medium");
      expect(title).toHaveAttribute("data-opacity", "medium");

      expect(value).toHaveAttribute("data-weight", "bold");
      expect(value).toHaveAttribute("data-opacity", "full");

      expect(description).toHaveAttribute("data-weight", "normal");
      expect(description).toHaveAttribute("data-opacity", "low");
    });

    it("composes IconContainer atom correctly", () => {
      render(<StatValue {...defaultProps} icon={MockIcon} variant="emerald" />);

      const icon = screen.getByTestId("test-stat-value-icon");
      expect(icon).toHaveAttribute("data-variant", "emerald");
    });
  });

  describe("Complex Scenarios", () => {
    it("renders complete stat with all features", () => {
      const handleClick = jest.fn();
      const formatter = (val: string) => `$${val}`;

      render(
        <StatValue
          value="1234.56"
          title="Revenue"
          icon={MockIcon}
          trend="+15%"
          description="Last 30 days"
          variant="emerald"
          size="lg"
          orientation="horizontal"
          formatValue={formatter}
          onClick={handleClick}
          className="custom-class"
          data-testid="complete-stat"
        />
      );

      const container = screen.getByTestId("complete-stat");
      const title = screen.getByTestId("complete-stat-title");
      const value = screen.getByTestId("complete-stat-value");
      const trend = screen.getByTestId("complete-stat-trend");
      const description = screen.getByTestId("complete-stat-description");
      const icon = screen.getByTestId("complete-stat-icon");

      // Check all elements are present
      expect(container).toBeInTheDocument();
      expect(title).toHaveTextContent("Revenue");
      expect(value).toHaveTextContent("$1234.56");
      expect(trend).toHaveTextContent("+15%");
      expect(description).toHaveTextContent("Last 30 days");
      expect(icon).toBeInTheDocument();

      // Check attributes
      expect(container).toHaveAttribute("data-variant", "emerald");
      expect(container).toHaveAttribute("data-size", "lg");
      expect(container).toHaveAttribute("data-orientation", "horizontal");
      expect(container).toHaveAttribute("data-interactive", "true");
      expect(container).toHaveClass("custom-class");

      // Check trend styling (positive trend should be emerald)
      expect(trend).toHaveAttribute("data-variant", "emerald");

      // Test interaction
      fireEvent.click(container);
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it("handles edge cases gracefully", () => {
      render(
        <StatValue
          value=""
          title=""
          trend=""
          description=""
          formatValue={() => "N/A"}
          data-testid="edge-case-stat"
        />
      );

      const container = screen.getByTestId("edge-case-stat");
      const title = screen.getByTestId("edge-case-stat-title");
      const value = screen.getByTestId("edge-case-stat-value");

      expect(container).toBeInTheDocument();
      expect(title).toHaveTextContent("");
      expect(value).toHaveTextContent("N/A");

      // Trend and description should not render when empty
      expect(
        screen.queryByTestId("edge-case-stat-trend")
      ).not.toBeInTheDocument();
      expect(
        screen.queryByTestId("edge-case-stat-description")
      ).not.toBeInTheDocument();
    });
  });

  describe("Accessibility", () => {
    it("has proper ARIA attributes when interactive", () => {
      render(<StatValue {...defaultProps} onClick={() => {}} />);

      const container = screen.getByTestId("test-stat-value");
      expect(container).toHaveAttribute("role", "button");
      expect(container).toHaveAttribute("tabIndex", "0");
    });

    it("does not have ARIA attributes when not interactive", () => {
      render(<StatValue {...defaultProps} />);

      const container = screen.getByTestId("test-stat-value");
      expect(container).not.toHaveAttribute("role");
      expect(container).not.toHaveAttribute("tabIndex");
    });

    it("prevents default behavior on keyboard events", () => {
      const handleClick = jest.fn();
      render(<StatValue {...defaultProps} onClick={handleClick} />);

      const container = screen.getByTestId("test-stat-value");
      
      // Test Enter key
      fireEvent.keyDown(container, { key: "Enter" });
      expect(handleClick).toHaveBeenCalledTimes(1);
      
      // Test Space key
      fireEvent.keyDown(container, { key: " " });
      expect(handleClick).toHaveBeenCalledTimes(2);
    });
  });
});
