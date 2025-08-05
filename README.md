# VibeSync 🎉

A modern React Native mobile application for discovering and connecting with local events, communities, and people in your area.

## 📱 About VibeSync

VibeSync is a comprehensive event discovery and community building platform that helps users find local events, connect with hosts, and build meaningful relationships in their community. The app features a beautiful, intuitive interface with modern design patterns and robust functionality.

### ✨ Key Features

- **Event Discovery**: Browse and search for local events by category, location, and interests
- **Interest Matching**: Personalized event recommendations based on user preferences
- **Community Building**: Connect with event hosts and other community members
- **Real-time Updates**: Stay informed about trending events and new activities
- **Multi-language Support**: Internationalization support for global communities
- **Offline Capability**: Core functionality works without internet connection
- **Modern UI/UX**: Beautiful, responsive design with smooth animations

## 🚀 Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (>= 18.0.0)
- **Yarn** (>= 1.22.22) - _Required package manager_
- **React Native CLI** (latest)
- **Android Studio** (for Android development)
- **Xcode** (for iOS development, macOS only)
- **Watchman** (recommended for file watching)

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd VibeSync
   ```

2. **Install dependencies**

   ```bash
   yarn install
   ```

3. **Install iOS dependencies** (macOS only)

   ```bash
   cd ios
   bundle install
   bundle exec pod install
   cd ..
   ```

4. **Link assets** (fonts, images, etc.)
   ```bash
   yarn link_asset
   ```

## 🛠️ Development

### Starting the Development Server

```bash
# Start Metro bundler
yarn start
```

### Running the App

#### Android

```bash
# Run on Android device/emulator
yarn android
```

#### iOS

```bash
# Run on iOS simulator/device
yarn ios

# Run production build
yarn ios_prod
```

### Building for Production

#### Android

```bash
# Build APK
yarn build_apk

# Build AAB (App Bundle)
yarn build_aab
```

#### iOS

```bash
# Build for iOS (requires Xcode)
# Open ios/VibeSync.xcworkspace in Xcode
# Select target device and build
```

## 📁 Project Structure

```
VibeSync/
├── src/
│   ├── assets/           # Images, fonts, SVGs
│   ├── components/       # Reusable UI components
│   ├── constants/        # App constants and data
│   ├── context/          # React Context providers
│   ├── hooks/            # Custom React hooks
│   ├── interfaces/       # TypeScript interfaces
│   ├── navigation/       # Navigation configuration
│   ├── network/          # API and network utilities
│   ├── redux/            # Redux store and slices
│   ├── screens/          # App screens
│   ├── services/         # Business logic services
│   ├── storage/          # Local storage utilities
│   ├── themes/           # Design system and styling
│   └── utils/            # Utility functions
├── android/              # Android native code
├── ios/                  # iOS native code
├── __tests__/            # Test files
└── plop-templates/       # Code generation templates
```

## 🎨 Design System

VibeSync uses a comprehensive design system with:

- **Color Themes**: Light and dark theme support
- **Typography**: Consistent font sizes and weights
- **Spacing**: Standardized spacing system
- **Components**: Reusable UI components
- **Icons**: Material Design and custom icons

### Key Components

- `AppButton`: Customizable buttons with multiple variants
- `AppInput`: Form inputs with validation
- `AppText`: Typography component with theme support
- `AppIcon`: Icon component with multiple icon sets
- `AppModal`: Modal and dialog components
- `AppToast`: Toast notification system

## 🔧 Configuration

### Environment Variables

Create environment files in the root directory:

```bash
# .env (development)
API_BASE_URL=https://api-dev.VibeSync.com
ENVIRONMENT=development

# .env.prod (production)
API_BASE_URL=https://api.VibeSync.com
ENVIRONMENT=production
```

### Metro Configuration

The project uses a custom Metro configuration for better performance and asset handling.

## 📱 Features

### Screens

1. **Home**: Event feed with trending events and filters
2. **Search**: Discover events, categories, and featured hosts
3. **Interests**: User interest selection and preferences
4. **Event Details**: Comprehensive event information
5. **Profile**: User profile and settings
6. **Chat**: Community messaging and connections

### Navigation

- **Bottom Tabs**: Main navigation between Home, Search, and Profile
- **Stack Navigation**: Screen navigation within each tab
- **Modal Navigation**: Overlay screens for actions

## 🧪 Testing

```bash
# Run tests
yarn test

# Run tests with coverage
yarn test --coverage

# Run specific test file
yarn test --testNamePattern="ComponentName"
```

## 📦 Available Scripts

```bash
# Development
yarn start              # Start Metro bundler
yarn android            # Run on Android
yarn ios                # Run on iOS
yarn ios_prod           # Run iOS production build

# Building
yarn build_apk          # Build Android APK
yarn build_aab          # Build Android App Bundle

# Utilities
yarn clean              # Clean build artifacts
yarn lint               # Run ESLint
yarn spell-check        # Run spell checker
yarn generate:index     # Generate component index files
yarn plop               # Generate new components/screens

# Maintenance
yarn pod                 # Install iOS pods
yarn link_asset         # Link assets
yarn stop               # Stop Android build
yarn clear              # Clear Android build
yarn watchman_clean     # Clean Watchman cache
```

## 🔍 Code Quality

### Linting and Formatting

The project uses ESLint and Prettier for code quality:

```bash
# Run linter
yarn lint

# Fix linting issues
yarn lint --fix
```

### TypeScript

Full TypeScript support with strict type checking and comprehensive type definitions.

### Code Generation

Use Plop.js for generating new components and screens:

```bash
# Generate a new component
yarn plop Component

# Generate a new screen
yarn plop Screen
```

## 🌐 Internationalization

VibeSync supports multiple languages using `i18n-js`:

- English (en)
- Japanese (ja)
- Extensible for more languages

## 🔐 Security

- **Encrypted Storage**: Sensitive data stored securely
- **Network Security**: HTTPS-only API communication
- **Input Validation**: Comprehensive form validation
- **Permission Handling**: Proper device permission management

## 📊 Performance

- **Fast Refresh**: Hot reloading for development
- **Image Optimization**: Fast image loading with caching
- **Bundle Optimization**: Efficient code splitting
- **Memory Management**: Proper cleanup and optimization

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines

- Follow the existing code style and patterns
- Write tests for new features
- Update documentation as needed
- Use TypeScript for all new code
- Follow the component structure in `plop-templates/`

## 🐛 Troubleshooting

### Common Issues

1. **Metro bundler issues**

   ```bash
   yarn start --reset-cache
   ```

2. **iOS build issues**

   ```bash
   cd ios
   bundle exec pod install
   cd ..
   yarn ios
   ```

3. **Android build issues**

   ```bash
   yarn clear
   yarn android
   ```

4. **Watchman issues**
   ```bash
   yarn watchman_clean
   ```

### Debugging

- Use React Native Debugger for advanced debugging
- Enable Chrome DevTools for web debugging
- Use Flipper for native debugging

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- React Native community
- Contributors and maintainers
- Design system inspiration from modern mobile apps

## 📞 Support

For support and questions:

- Create an issue in the repository
- Check the troubleshooting section
- Review the documentation

---

**Made with ❤️ by the VibeSync team**
