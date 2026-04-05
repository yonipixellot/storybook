<template>
  <div
    class="app-input"
    :class="{
      'app-input--error': error,
      'app-input--disabled': disabled,
      'app-input--readonly': readOnly,
      'app-input--tel': type === 'tel',
    }"
  >
    <!-- Country code selector for tel type -->
    <button
      v-if="type === 'tel'"
      ref="telBtnRef"
      class="app-input__tel-btn"
      type="button"
      :disabled="disabled"
      @click="toggleDropdown"
    >
      <span class="app-input__tel-flag">{{ selectedCountry.flag }}</span>
      <span class="app-input__tel-code">{{ selectedCountry.dial }}</span>
      <svg class="app-input__tel-chevron" :class="{ 'app-input__tel-chevron--open': dropdownOpen }" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg>
    </button>

    <!-- Country dropdown -->
    <div v-if="dropdownOpen" ref="dropdownRef" class="app-input__dropdown">
      <div class="app-input__dropdown-search">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
        <input
          ref="searchRef"
          v-model="countrySearch"
          class="app-input__dropdown-input"
          placeholder="Search country..."
          @keydown.escape="dropdownOpen = false"
        />
      </div>
      <ul class="app-input__dropdown-list">
        <li
          v-for="c in filteredCountries"
          :key="c.code"
          class="app-input__dropdown-item"
          :class="{ 'app-input__dropdown-item--active': c.code === selectedCountry.code }"
          @click="selectCountry(c)"
        >
          <span class="app-input__dropdown-flag">{{ c.flag }}</span>
          <span class="app-input__dropdown-name">{{ c.name }}</span>
          <span class="app-input__dropdown-dial">{{ c.dial }}</span>
        </li>
        <li v-if="filteredCountries.length === 0" class="app-input__dropdown-empty">No results</li>
      </ul>
    </div>

    <input
      :type="computedType"
      :placeholder="placeholder"
      :value="modelValue"
      :disabled="disabled"
      :readonly="readOnly"
      :aria-label="ariaLabel || placeholder"
      :aria-invalid="error || undefined"
      :aria-describedby="error && errorMsg ? errorId : undefined"
      class="app-input__field"
      @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
      @focus="isFocused = true"
      @blur="isFocused = false"
    />
    <button
      v-if="type === 'password'"
      class="app-input__toggle"
      :aria-label="showPwd ? 'Hide password' : 'Show password'"
      @click="showPwd = !showPwd"
      type="button"
      :disabled="disabled"
    >
      <svg v-if="!showPwd" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
      <svg v-else width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
    </button>
    <span v-if="error && errorMsg" :id="errorId" class="app-input__error">
      {{ errorMsg }}
    </span>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, nextTick, onMounted, onUnmounted } from 'vue'

interface Country {
  code: string
  name: string
  dial: string
  flag: string
}

const countries: Country[] = [
  { code: 'AF', name: 'Afghanistan', dial: '+93', flag: '🇦🇫' },
  { code: 'AL', name: 'Albania', dial: '+355', flag: '🇦🇱' },
  { code: 'DZ', name: 'Algeria', dial: '+213', flag: '🇩🇿' },
  { code: 'AS', name: 'American Samoa', dial: '+1684', flag: '🇦🇸' },
  { code: 'AD', name: 'Andorra', dial: '+376', flag: '🇦🇩' },
  { code: 'AO', name: 'Angola', dial: '+244', flag: '🇦🇴' },
  { code: 'AI', name: 'Anguilla', dial: '+1264', flag: '🇦🇮' },
  { code: 'AG', name: 'Antigua & Barbuda', dial: '+1268', flag: '🇦🇬' },
  { code: 'AR', name: 'Argentina', dial: '+54', flag: '🇦🇷' },
  { code: 'AM', name: 'Armenia', dial: '+374', flag: '🇦🇲' },
  { code: 'AW', name: 'Aruba', dial: '+297', flag: '🇦🇼' },
  { code: 'AU', name: 'Australia', dial: '+61', flag: '🇦🇺' },
  { code: 'AT', name: 'Austria', dial: '+43', flag: '🇦🇹' },
  { code: 'AZ', name: 'Azerbaijan', dial: '+994', flag: '🇦🇿' },
  { code: 'BS', name: 'Bahamas', dial: '+1242', flag: '🇧🇸' },
  { code: 'BH', name: 'Bahrain', dial: '+973', flag: '🇧🇭' },
  { code: 'BD', name: 'Bangladesh', dial: '+880', flag: '🇧🇩' },
  { code: 'BB', name: 'Barbados', dial: '+1246', flag: '🇧🇧' },
  { code: 'BY', name: 'Belarus', dial: '+375', flag: '🇧🇾' },
  { code: 'BE', name: 'Belgium', dial: '+32', flag: '🇧🇪' },
  { code: 'BZ', name: 'Belize', dial: '+501', flag: '🇧🇿' },
  { code: 'BJ', name: 'Benin', dial: '+229', flag: '🇧🇯' },
  { code: 'BM', name: 'Bermuda', dial: '+1441', flag: '🇧🇲' },
  { code: 'BT', name: 'Bhutan', dial: '+975', flag: '🇧🇹' },
  { code: 'BO', name: 'Bolivia', dial: '+591', flag: '🇧🇴' },
  { code: 'BA', name: 'Bosnia & Herzegovina', dial: '+387', flag: '🇧🇦' },
  { code: 'BW', name: 'Botswana', dial: '+267', flag: '🇧🇼' },
  { code: 'BR', name: 'Brazil', dial: '+55', flag: '🇧🇷' },
  { code: 'BN', name: 'Brunei', dial: '+673', flag: '🇧🇳' },
  { code: 'BG', name: 'Bulgaria', dial: '+359', flag: '🇧🇬' },
  { code: 'BF', name: 'Burkina Faso', dial: '+226', flag: '🇧🇫' },
  { code: 'BI', name: 'Burundi', dial: '+257', flag: '🇧🇮' },
  { code: 'KH', name: 'Cambodia', dial: '+855', flag: '🇰🇭' },
  { code: 'CM', name: 'Cameroon', dial: '+237', flag: '🇨🇲' },
  { code: 'CA', name: 'Canada', dial: '+1', flag: '🇨🇦' },
  { code: 'CV', name: 'Cape Verde', dial: '+238', flag: '🇨🇻' },
  { code: 'KY', name: 'Cayman Islands', dial: '+1345', flag: '🇰🇾' },
  { code: 'CF', name: 'Central African Republic', dial: '+236', flag: '🇨🇫' },
  { code: 'TD', name: 'Chad', dial: '+235', flag: '🇹🇩' },
  { code: 'CL', name: 'Chile', dial: '+56', flag: '🇨🇱' },
  { code: 'CN', name: 'China', dial: '+86', flag: '🇨🇳' },
  { code: 'CO', name: 'Colombia', dial: '+57', flag: '🇨🇴' },
  { code: 'KM', name: 'Comoros', dial: '+269', flag: '🇰🇲' },
  { code: 'CG', name: 'Congo', dial: '+242', flag: '🇨🇬' },
  { code: 'CD', name: 'Congo (DRC)', dial: '+243', flag: '🇨🇩' },
  { code: 'CK', name: 'Cook Islands', dial: '+682', flag: '🇨🇰' },
  { code: 'CR', name: 'Costa Rica', dial: '+506', flag: '🇨🇷' },
  { code: 'CI', name: "Cote d'Ivoire", dial: '+225', flag: '🇨🇮' },
  { code: 'HR', name: 'Croatia', dial: '+385', flag: '🇭🇷' },
  { code: 'CU', name: 'Cuba', dial: '+53', flag: '🇨🇺' },
  { code: 'CW', name: 'Curacao', dial: '+599', flag: '🇨🇼' },
  { code: 'CY', name: 'Cyprus', dial: '+357', flag: '🇨🇾' },
  { code: 'CZ', name: 'Czech Republic', dial: '+420', flag: '🇨🇿' },
  { code: 'DK', name: 'Denmark', dial: '+45', flag: '🇩🇰' },
  { code: 'DJ', name: 'Djibouti', dial: '+253', flag: '🇩🇯' },
  { code: 'DM', name: 'Dominica', dial: '+1767', flag: '🇩🇲' },
  { code: 'DO', name: 'Dominican Republic', dial: '+1809', flag: '🇩🇴' },
  { code: 'EC', name: 'Ecuador', dial: '+593', flag: '🇪🇨' },
  { code: 'EG', name: 'Egypt', dial: '+20', flag: '🇪🇬' },
  { code: 'SV', name: 'El Salvador', dial: '+503', flag: '🇸🇻' },
  { code: 'GQ', name: 'Equatorial Guinea', dial: '+240', flag: '🇬🇶' },
  { code: 'ER', name: 'Eritrea', dial: '+291', flag: '🇪🇷' },
  { code: 'EE', name: 'Estonia', dial: '+372', flag: '🇪🇪' },
  { code: 'SZ', name: 'Eswatini', dial: '+268', flag: '🇸🇿' },
  { code: 'ET', name: 'Ethiopia', dial: '+251', flag: '🇪🇹' },
  { code: 'FK', name: 'Falkland Islands', dial: '+500', flag: '🇫🇰' },
  { code: 'FO', name: 'Faroe Islands', dial: '+298', flag: '🇫🇴' },
  { code: 'FJ', name: 'Fiji', dial: '+679', flag: '🇫🇯' },
  { code: 'FI', name: 'Finland', dial: '+358', flag: '🇫🇮' },
  { code: 'FR', name: 'France', dial: '+33', flag: '🇫🇷' },
  { code: 'GF', name: 'French Guiana', dial: '+594', flag: '🇬🇫' },
  { code: 'PF', name: 'French Polynesia', dial: '+689', flag: '🇵🇫' },
  { code: 'GA', name: 'Gabon', dial: '+241', flag: '🇬🇦' },
  { code: 'GM', name: 'Gambia', dial: '+220', flag: '🇬🇲' },
  { code: 'GE', name: 'Georgia', dial: '+995', flag: '🇬🇪' },
  { code: 'DE', name: 'Germany', dial: '+49', flag: '🇩🇪' },
  { code: 'GH', name: 'Ghana', dial: '+233', flag: '🇬🇭' },
  { code: 'GI', name: 'Gibraltar', dial: '+350', flag: '🇬🇮' },
  { code: 'GR', name: 'Greece', dial: '+30', flag: '🇬🇷' },
  { code: 'GL', name: 'Greenland', dial: '+299', flag: '🇬🇱' },
  { code: 'GD', name: 'Grenada', dial: '+1473', flag: '🇬🇩' },
  { code: 'GP', name: 'Guadeloupe', dial: '+590', flag: '🇬🇵' },
  { code: 'GU', name: 'Guam', dial: '+1671', flag: '🇬🇺' },
  { code: 'GT', name: 'Guatemala', dial: '+502', flag: '🇬🇹' },
  { code: 'GG', name: 'Guernsey', dial: '+44', flag: '🇬🇬' },
  { code: 'GN', name: 'Guinea', dial: '+224', flag: '🇬🇳' },
  { code: 'GW', name: 'Guinea-Bissau', dial: '+245', flag: '🇬🇼' },
  { code: 'GY', name: 'Guyana', dial: '+592', flag: '🇬🇾' },
  { code: 'HT', name: 'Haiti', dial: '+509', flag: '🇭🇹' },
  { code: 'HN', name: 'Honduras', dial: '+504', flag: '🇭🇳' },
  { code: 'HK', name: 'Hong Kong', dial: '+852', flag: '🇭🇰' },
  { code: 'HU', name: 'Hungary', dial: '+36', flag: '🇭🇺' },
  { code: 'IS', name: 'Iceland', dial: '+354', flag: '🇮🇸' },
  { code: 'IN', name: 'India', dial: '+91', flag: '🇮🇳' },
  { code: 'ID', name: 'Indonesia', dial: '+62', flag: '🇮🇩' },
  { code: 'IR', name: 'Iran', dial: '+98', flag: '🇮🇷' },
  { code: 'IQ', name: 'Iraq', dial: '+964', flag: '🇮🇶' },
  { code: 'IE', name: 'Ireland', dial: '+353', flag: '🇮🇪' },
  { code: 'IM', name: 'Isle of Man', dial: '+44', flag: '🇮🇲' },
  { code: 'IL', name: 'Israel', dial: '+972', flag: '🇮🇱' },
  { code: 'IT', name: 'Italy', dial: '+39', flag: '🇮🇹' },
  { code: 'JM', name: 'Jamaica', dial: '+1876', flag: '🇯🇲' },
  { code: 'JP', name: 'Japan', dial: '+81', flag: '🇯🇵' },
  { code: 'JE', name: 'Jersey', dial: '+44', flag: '🇯🇪' },
  { code: 'JO', name: 'Jordan', dial: '+962', flag: '🇯🇴' },
  { code: 'KZ', name: 'Kazakhstan', dial: '+7', flag: '🇰🇿' },
  { code: 'KE', name: 'Kenya', dial: '+254', flag: '🇰🇪' },
  { code: 'KI', name: 'Kiribati', dial: '+686', flag: '🇰🇮' },
  { code: 'XK', name: 'Kosovo', dial: '+383', flag: '🇽🇰' },
  { code: 'KW', name: 'Kuwait', dial: '+965', flag: '🇰🇼' },
  { code: 'KG', name: 'Kyrgyzstan', dial: '+996', flag: '🇰🇬' },
  { code: 'LA', name: 'Laos', dial: '+856', flag: '🇱🇦' },
  { code: 'LV', name: 'Latvia', dial: '+371', flag: '🇱🇻' },
  { code: 'LB', name: 'Lebanon', dial: '+961', flag: '🇱🇧' },
  { code: 'LS', name: 'Lesotho', dial: '+266', flag: '🇱🇸' },
  { code: 'LR', name: 'Liberia', dial: '+231', flag: '🇱🇷' },
  { code: 'LY', name: 'Libya', dial: '+218', flag: '🇱🇾' },
  { code: 'LI', name: 'Liechtenstein', dial: '+423', flag: '🇱🇮' },
  { code: 'LT', name: 'Lithuania', dial: '+370', flag: '🇱🇹' },
  { code: 'LU', name: 'Luxembourg', dial: '+352', flag: '🇱🇺' },
  { code: 'MO', name: 'Macau', dial: '+853', flag: '🇲🇴' },
  { code: 'MK', name: 'North Macedonia', dial: '+389', flag: '🇲🇰' },
  { code: 'MG', name: 'Madagascar', dial: '+261', flag: '🇲🇬' },
  { code: 'MW', name: 'Malawi', dial: '+265', flag: '🇲🇼' },
  { code: 'MY', name: 'Malaysia', dial: '+60', flag: '🇲🇾' },
  { code: 'MV', name: 'Maldives', dial: '+960', flag: '🇲🇻' },
  { code: 'ML', name: 'Mali', dial: '+223', flag: '🇲🇱' },
  { code: 'MT', name: 'Malta', dial: '+356', flag: '🇲🇹' },
  { code: 'MH', name: 'Marshall Islands', dial: '+692', flag: '🇲🇭' },
  { code: 'MQ', name: 'Martinique', dial: '+596', flag: '🇲🇶' },
  { code: 'MR', name: 'Mauritania', dial: '+222', flag: '🇲🇷' },
  { code: 'MU', name: 'Mauritius', dial: '+230', flag: '🇲🇺' },
  { code: 'YT', name: 'Mayotte', dial: '+262', flag: '🇾🇹' },
  { code: 'MX', name: 'Mexico', dial: '+52', flag: '🇲🇽' },
  { code: 'FM', name: 'Micronesia', dial: '+691', flag: '🇫🇲' },
  { code: 'MD', name: 'Moldova', dial: '+373', flag: '🇲🇩' },
  { code: 'MC', name: 'Monaco', dial: '+377', flag: '🇲🇨' },
  { code: 'MN', name: 'Mongolia', dial: '+976', flag: '🇲🇳' },
  { code: 'ME', name: 'Montenegro', dial: '+382', flag: '🇲🇪' },
  { code: 'MS', name: 'Montserrat', dial: '+1664', flag: '🇲🇸' },
  { code: 'MA', name: 'Morocco', dial: '+212', flag: '🇲🇦' },
  { code: 'MZ', name: 'Mozambique', dial: '+258', flag: '🇲🇿' },
  { code: 'MM', name: 'Myanmar', dial: '+95', flag: '🇲🇲' },
  { code: 'NA', name: 'Namibia', dial: '+264', flag: '🇳🇦' },
  { code: 'NR', name: 'Nauru', dial: '+674', flag: '🇳🇷' },
  { code: 'NP', name: 'Nepal', dial: '+977', flag: '🇳🇵' },
  { code: 'NL', name: 'Netherlands', dial: '+31', flag: '🇳🇱' },
  { code: 'NC', name: 'New Caledonia', dial: '+687', flag: '🇳🇨' },
  { code: 'NZ', name: 'New Zealand', dial: '+64', flag: '🇳🇿' },
  { code: 'NI', name: 'Nicaragua', dial: '+505', flag: '🇳🇮' },
  { code: 'NE', name: 'Niger', dial: '+227', flag: '🇳🇪' },
  { code: 'NG', name: 'Nigeria', dial: '+234', flag: '🇳🇬' },
  { code: 'NU', name: 'Niue', dial: '+683', flag: '🇳🇺' },
  { code: 'NF', name: 'Norfolk Island', dial: '+672', flag: '🇳🇫' },
  { code: 'KP', name: 'North Korea', dial: '+850', flag: '🇰🇵' },
  { code: 'NO', name: 'Norway', dial: '+47', flag: '🇳🇴' },
  { code: 'OM', name: 'Oman', dial: '+968', flag: '🇴🇲' },
  { code: 'PK', name: 'Pakistan', dial: '+92', flag: '🇵🇰' },
  { code: 'PW', name: 'Palau', dial: '+680', flag: '🇵🇼' },
  { code: 'PS', name: 'Palestine', dial: '+970', flag: '🇵🇸' },
  { code: 'PA', name: 'Panama', dial: '+507', flag: '🇵🇦' },
  { code: 'PG', name: 'Papua New Guinea', dial: '+675', flag: '🇵🇬' },
  { code: 'PY', name: 'Paraguay', dial: '+595', flag: '🇵🇾' },
  { code: 'PE', name: 'Peru', dial: '+51', flag: '🇵🇪' },
  { code: 'PH', name: 'Philippines', dial: '+63', flag: '🇵🇭' },
  { code: 'PL', name: 'Poland', dial: '+48', flag: '🇵🇱' },
  { code: 'PT', name: 'Portugal', dial: '+351', flag: '🇵🇹' },
  { code: 'PR', name: 'Puerto Rico', dial: '+1787', flag: '🇵🇷' },
  { code: 'QA', name: 'Qatar', dial: '+974', flag: '🇶🇦' },
  { code: 'RE', name: 'Reunion', dial: '+262', flag: '🇷🇪' },
  { code: 'RO', name: 'Romania', dial: '+40', flag: '🇷🇴' },
  { code: 'RU', name: 'Russia', dial: '+7', flag: '🇷🇺' },
  { code: 'RW', name: 'Rwanda', dial: '+250', flag: '🇷🇼' },
  { code: 'BL', name: 'Saint Barthelemy', dial: '+590', flag: '🇧🇱' },
  { code: 'SH', name: 'Saint Helena', dial: '+290', flag: '🇸🇭' },
  { code: 'KN', name: 'Saint Kitts & Nevis', dial: '+1869', flag: '🇰🇳' },
  { code: 'LC', name: 'Saint Lucia', dial: '+1758', flag: '🇱🇨' },
  { code: 'MF', name: 'Saint Martin', dial: '+590', flag: '🇲🇫' },
  { code: 'PM', name: 'Saint Pierre & Miquelon', dial: '+508', flag: '🇵🇲' },
  { code: 'VC', name: 'Saint Vincent & Grenadines', dial: '+1784', flag: '🇻🇨' },
  { code: 'WS', name: 'Samoa', dial: '+685', flag: '🇼🇸' },
  { code: 'SM', name: 'San Marino', dial: '+378', flag: '🇸🇲' },
  { code: 'ST', name: 'Sao Tome & Principe', dial: '+239', flag: '🇸🇹' },
  { code: 'SA', name: 'Saudi Arabia', dial: '+966', flag: '🇸🇦' },
  { code: 'SN', name: 'Senegal', dial: '+221', flag: '🇸🇳' },
  { code: 'RS', name: 'Serbia', dial: '+381', flag: '🇷🇸' },
  { code: 'SC', name: 'Seychelles', dial: '+248', flag: '🇸🇨' },
  { code: 'SL', name: 'Sierra Leone', dial: '+232', flag: '🇸🇱' },
  { code: 'SG', name: 'Singapore', dial: '+65', flag: '🇸🇬' },
  { code: 'SX', name: 'Sint Maarten', dial: '+1721', flag: '🇸🇽' },
  { code: 'SK', name: 'Slovakia', dial: '+421', flag: '🇸🇰' },
  { code: 'SI', name: 'Slovenia', dial: '+386', flag: '🇸🇮' },
  { code: 'SB', name: 'Solomon Islands', dial: '+677', flag: '🇸🇧' },
  { code: 'SO', name: 'Somalia', dial: '+252', flag: '🇸🇴' },
  { code: 'ZA', name: 'South Africa', dial: '+27', flag: '🇿🇦' },
  { code: 'KR', name: 'South Korea', dial: '+82', flag: '🇰🇷' },
  { code: 'SS', name: 'South Sudan', dial: '+211', flag: '🇸🇸' },
  { code: 'ES', name: 'Spain', dial: '+34', flag: '🇪🇸' },
  { code: 'LK', name: 'Sri Lanka', dial: '+94', flag: '🇱🇰' },
  { code: 'SD', name: 'Sudan', dial: '+249', flag: '🇸🇩' },
  { code: 'SR', name: 'Suriname', dial: '+597', flag: '🇸🇷' },
  { code: 'SE', name: 'Sweden', dial: '+46', flag: '🇸🇪' },
  { code: 'CH', name: 'Switzerland', dial: '+41', flag: '🇨🇭' },
  { code: 'SY', name: 'Syria', dial: '+963', flag: '🇸🇾' },
  { code: 'TW', name: 'Taiwan', dial: '+886', flag: '🇹🇼' },
  { code: 'TJ', name: 'Tajikistan', dial: '+992', flag: '🇹🇯' },
  { code: 'TZ', name: 'Tanzania', dial: '+255', flag: '🇹🇿' },
  { code: 'TH', name: 'Thailand', dial: '+66', flag: '🇹🇭' },
  { code: 'TL', name: 'Timor-Leste', dial: '+670', flag: '🇹🇱' },
  { code: 'TG', name: 'Togo', dial: '+228', flag: '🇹🇬' },
  { code: 'TK', name: 'Tokelau', dial: '+690', flag: '🇹🇰' },
  { code: 'TO', name: 'Tonga', dial: '+676', flag: '🇹🇴' },
  { code: 'TT', name: 'Trinidad & Tobago', dial: '+1868', flag: '🇹🇹' },
  { code: 'TN', name: 'Tunisia', dial: '+216', flag: '🇹🇳' },
  { code: 'TR', name: 'Turkey', dial: '+90', flag: '🇹🇷' },
  { code: 'TM', name: 'Turkmenistan', dial: '+993', flag: '🇹🇲' },
  { code: 'TC', name: 'Turks & Caicos Islands', dial: '+1649', flag: '🇹🇨' },
  { code: 'TV', name: 'Tuvalu', dial: '+688', flag: '🇹🇻' },
  { code: 'UG', name: 'Uganda', dial: '+256', flag: '🇺🇬' },
  { code: 'UA', name: 'Ukraine', dial: '+380', flag: '🇺🇦' },
  { code: 'AE', name: 'United Arab Emirates', dial: '+971', flag: '🇦🇪' },
  { code: 'GB', name: 'United Kingdom', dial: '+44', flag: '🇬🇧' },
  { code: 'US', name: 'United States', dial: '+1', flag: '🇺🇸' },
  { code: 'UY', name: 'Uruguay', dial: '+598', flag: '🇺🇾' },
  { code: 'UZ', name: 'Uzbekistan', dial: '+998', flag: '🇺🇿' },
  { code: 'VU', name: 'Vanuatu', dial: '+678', flag: '🇻🇺' },
  { code: 'VA', name: 'Vatican City', dial: '+379', flag: '🇻🇦' },
  { code: 'VE', name: 'Venezuela', dial: '+58', flag: '🇻🇪' },
  { code: 'VN', name: 'Vietnam', dial: '+84', flag: '🇻🇳' },
  { code: 'VG', name: 'British Virgin Islands', dial: '+1284', flag: '🇻🇬' },
  { code: 'VI', name: 'US Virgin Islands', dial: '+1340', flag: '🇻🇮' },
  { code: 'WF', name: 'Wallis & Futuna', dial: '+681', flag: '🇼🇫' },
  { code: 'YE', name: 'Yemen', dial: '+967', flag: '🇾🇪' },
  { code: 'ZM', name: 'Zambia', dial: '+260', flag: '🇿🇲' },
  { code: 'ZW', name: 'Zimbabwe', dial: '+263', flag: '🇿🇼' },
]

const props = withDefaults(defineProps<{
  modelValue?: string
  placeholder?: string
  type?: string
  error?: boolean
  errorMsg?: string
  disabled?: boolean
  readOnly?: boolean
  ariaLabel?: string
  defaultCountry?: string
}>(), {
  type: 'text',
  error: false,
  disabled: false,
  readOnly: false,
  defaultCountry: 'IL',
})

const emit = defineEmits<{
  'update:modelValue': [value: string]
  'country-change': [country: Country]
}>()

const showPwd = ref(false)
const isFocused = ref(false)
const computedType = computed(() =>
  props.type === 'password' && showPwd.value ? 'text' : props.type
)
const errorId = computed(() =>
  'err-' + (props.placeholder || '').replace(/\s/g, '')
)

/* ── Tel / Country selector ── */
const dropdownOpen = ref(false)
const countrySearch = ref('')
const searchRef = ref<HTMLInputElement | null>(null)
const dropdownRef = ref<HTMLElement | null>(null)
const telBtnRef = ref<HTMLElement | null>(null)

const selectedCountry = ref<Country>(
  countries.find(c => c.code === props.defaultCountry) || countries[0]
)

const filteredCountries = computed(() => {
  const q = countrySearch.value.toLowerCase().trim()
  if (!q) return countries
  return countries.filter(
    c => c.name.toLowerCase().includes(q) || c.dial.includes(q) || c.code.toLowerCase().includes(q)
  )
})

function toggleDropdown() {
  dropdownOpen.value = !dropdownOpen.value
  if (dropdownOpen.value) {
    countrySearch.value = ''
    nextTick(() => searchRef.value?.focus())
  }
}

function selectCountry(c: Country) {
  selectedCountry.value = c
  dropdownOpen.value = false
  emit('country-change', c)
}

/* Close dropdown on outside click */
function handleClickOutside(e: MouseEvent) {
  if (
    dropdownOpen.value &&
    dropdownRef.value &&
    telBtnRef.value &&
    !dropdownRef.value.contains(e.target as Node) &&
    !telBtnRef.value.contains(e.target as Node)
  ) {
    dropdownOpen.value = false
  }
}

onMounted(() => document.addEventListener('mousedown', handleClickOutside))
onUnmounted(() => document.removeEventListener('mousedown', handleClickOutside))
</script>

<style scoped>
/* ── Base ── */
.app-input {
  position: relative;
  width: 100%;
}

/* ── Input Field ── */
.app-input__field {
  width: 100%;
  height: 46px;
  padding: 4px 16px;
  font-family: var(--font-family-base);
  font-size: var(--text-base);
  font-weight: 400;
  color: var(--color-black);
  background: var(--color-gray-100);
  border: 2px solid transparent;
  border-radius: var(--radius-lg);
  outline: none;
  box-sizing: border-box;
  transition: background var(--duration-fast), border-color var(--duration-fast);
}

.app-input__field::placeholder {
  color: var(--color-gray-400);
}

/* ── Hover ── */
.app-input__field:hover:not(:disabled):not(:read-only) {
  background: var(--color-gray-200);
}

/* ── Focus ── */
.app-input__field:focus {
  border: 2px solid var(--color-primary);
}

/* ── Error ── */
.app-input--error .app-input__field {
  border: 2px solid var(--color-error-red);
}
.app-input--error .app-input__field:focus {
  border: 2px solid var(--color-error-red);
}
.app-input--error .app-input__field:hover:not(:disabled) {
  background: var(--color-gray-200);
}

/* ── Disabled ── */
.app-input--disabled .app-input__field {
  background: var(--color-gray-overlay);
  color: var(--color-gray-400);
  cursor: not-allowed;
}

/* ── ReadOnly ── */
.app-input--readonly .app-input__field {
  background: var(--color-gray-50);
  cursor: default;
}

/* ── Password with toggle — extra right padding ── */
.app-input:has(.app-input__toggle) .app-input__field {
  padding-right: 44px;
}

/* ── Toggle Button (eye icon) ── */
.app-input__toggle {
  position: absolute;
  right: 14px;
  top: 14px;
  background: none;
  border: none;
  cursor: pointer;
  color: var(--color-gray-400);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  transition: color var(--duration-fast);
}
.app-input__toggle:hover:not(:disabled) {
  color: var(--color-gray-500);
}
.app-input__toggle:disabled {
  cursor: not-allowed;
  opacity: 0.5;
}

/* ── Error Message ── */
.app-input__error {
  font-family: var(--font-family-base);
  font-size: var(--text-caption);
  color: var(--color-error-red);
  display: block;
  margin-top: 4px;
  padding-left: 16px;
}

/* ══════════════════════════════
   Tel — Country Code Selector
   ══════════════════════════════ */

.app-input--tel .app-input__field {
  padding-left: 110px;
}

/* Country button inside input */
.app-input__tel-btn {
  position: absolute;
  left: 4px;
  top: 4px;
  height: 38px;
  z-index: var(--z-base);
  display: flex;
  align-items: center;
  gap: var(--space-xs);
  padding: 0 8px 0 12px;
  background: none;
  border: none;
  border-right: 1px solid var(--color-gray-200);
  cursor: pointer;
  font-family: var(--font-family-base);
  border-radius: var(--radius-md) 0 0 var(--radius-md);
  transition: background var(--duration-fast);
}

.app-input__tel-btn:hover:not(:disabled) {
  background: rgba(0, 0, 0, 0.04);
}

.app-input__tel-btn:disabled {
  cursor: not-allowed;
  opacity: 0.5;
}

.app-input__tel-flag {
  font-size: var(--text-h3);
  line-height: 1;
}

.app-input__tel-code {
  font-size: var(--text-xs);
  font-weight: 500;
  color: var(--color-dark-text);
  white-space: nowrap;
}

.app-input__tel-chevron {
  color: var(--color-gray-400);
  transition: transform var(--duration-base) var(--easing-standard);
  flex-shrink: 0;
}

.app-input__tel-chevron--open {
  transform: rotate(180deg);
}

/* ── Dropdown ── */
.app-input__dropdown {
  position: absolute;
  top: calc(100% + 4px);
  left: 0;
  width: 280px;
  max-height: 280px;
  background: var(--color-white);
  border: 1px solid var(--color-gray-300);
  border-radius: var(--radius-md);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
  z-index: var(--z-dropdown);
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.app-input__dropdown-search {
  display: flex;
  align-items: center;
  gap: var(--space-sm);
  padding: 10px 14px;
  border-bottom: 1px solid var(--color-card-hover-bg);
  color: var(--color-gray-400); /* currentColor on SVG resolves from here */
}

.app-input__dropdown-input {
  flex: 1;
  border: none;
  outline: none;
  font-family: var(--font-family-base);
  font-size: var(--text-xs);
  font-weight: 400;
  color: var(--color-dark-text);
  background: transparent;
}

.app-input__dropdown-input::placeholder {
  color: var(--color-gray-400);
}

.app-input__dropdown-list {
  list-style: none;
  margin: 0;
  padding: 4px 0;
  overflow-y: auto;
  flex: 1;
}

.app-input__dropdown-item {
  display: flex;
  align-items: center;
  gap: var(--space-sm2);
  padding: 8px 14px;
  cursor: pointer;
  transition: background var(--duration-instant);
}

.app-input__dropdown-item:hover {
  background: var(--color-gray-50);
}

.app-input__dropdown-item--active {
  background: var(--color-primary-bg-light);
}

.app-input__dropdown-item--active:hover {
  background: var(--color-primary-bg-lighter);
}

.app-input__dropdown-flag {
  font-size: var(--text-h3);
  line-height: 1;
}

.app-input__dropdown-name {
  flex: 1;
  font-family: var(--font-family-base);
  font-size: var(--text-xs);
  font-weight: 500;
  color: var(--color-dark-text);
}

.app-input__dropdown-dial {
  font-family: var(--font-family-base);
  font-size: var(--text-body2);
  font-weight: 400;
  color: var(--color-gray-400);
}

.app-input__dropdown-empty {
  padding: 16px 14px;
  font-family: var(--font-family-base);
  font-size: var(--text-xs);
  color: var(--color-gray-400);
  text-align: center;
}
</style>
