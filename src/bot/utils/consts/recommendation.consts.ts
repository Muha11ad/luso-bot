export const AGES = ['16-25', '25-35', '35-45', '50-55', '50+'];
export const AGES_WITH_CALLBACK = AGES.map((age) => ({
  text: age,
  callback_data: `age_${age}`,
}));

export const SKIN_TYPES = ['Dry_skin', 'Oily_skin', 'Sensetive_skin', 'Combination_skin'];
export const SKIN_TYPES_WITH_CALLBACK = SKIN_TYPES.map((skinType) => ({
  text: skinType,
  callback_data: `skin_${skinType}`,
}));
