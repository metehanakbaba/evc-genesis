import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useI18n, SupportedLocale } from '../i18n';

interface LanguageSelectorProps {
  variant?: 'compact' | 'full';
}

export function LanguageSelector({ variant = 'compact' }: LanguageSelectorProps) {
  const { locale, setLocale } = useI18n();

  const languages: { code: SupportedLocale; label: string; flag: string }[] = [
    { code: 'en', label: 'English', flag: '🇺🇸' },
    { code: 'pl', label: 'Polski', flag: '🇵🇱' },
  ];

  if (variant === 'compact') {
    return (
      <View className="flex-row bg-white/10 rounded-lg p-1">
        {languages.map((lang) => (
          <TouchableOpacity
            key={lang.code}
            onPress={() => setLocale(lang.code)}
            className={`
              px-3 py-2 rounded-md flex-row items-center space-x-2
              ${locale === lang.code 
                ? 'bg-white/20 border border-white/30' 
                : 'bg-transparent'
              }
            `}
          >
            <Text className="text-white text-sm">{lang.flag}</Text>
            <Text 
              className={`
                text-sm font-medium
                ${locale === lang.code ? 'text-white' : 'text-gray-300'}
              `}
            >
              {lang.code.toUpperCase()}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    );
  }

  return (
    <View className="space-y-2">
      <Text className="text-white text-base font-medium">Language / Język</Text>
      <View className="space-y-2">
        {languages.map((lang) => (
          <TouchableOpacity
            key={lang.code}
            onPress={() => setLocale(lang.code)}
            className={`
              p-4 rounded-xl flex-row items-center space-x-3 border
              ${locale === lang.code 
                ? 'bg-blue-500/20 border-blue-400/50' 
                : 'bg-white/5 border-white/10'
              }
            `}
          >
            <Text className="text-2xl">{lang.flag}</Text>
            <View className="flex-1">
              <Text 
                className={`
                  text-base font-medium
                  ${locale === lang.code ? 'text-blue-300' : 'text-white'}
                `}
              >
                {lang.label}
              </Text>
            </View>
            {locale === lang.code && (
              <View className="w-3 h-3 bg-blue-400 rounded-full" />
            )}
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
} 