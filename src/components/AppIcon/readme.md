# AppIcon Component

The `AppIcon` component provides a unified interface for using three types of icons within the app:
- **Vector Icons** (default): `<AppIcon />`
- **Image Icons**: `<AppIcon.Image />`
- **SVG Icons**: `<AppIcon.Svg />`

Each type has specific usage requirements, enabling developers to use enums for consistency and clarity.

## Table of Contents
- [Installation](#installation)
- [Usage](#usage)
  - [Vector Icons](#material-icons)
  - [Image Icons](#image-icons)
  - [SVG Icons](#svg-icons)
- [Icon Enums](#icon-enums)

---

### Installation
Simply import the component into your project file:

```javascript
import AppIcon from './AppIcon';
```

## Usage

### Vector Icons (Default)

The default `AppIcon` component uses Vector Icons from `react-native-vector-icons`. Developers should use the `Icons` enum for specifying the icon name.

```typescript
import AppIcon from './AppIcon';
import { Icons } from './AppIconsDir';

<AppIcon icon={Icons.home} iconSize="medium" color="primary" />
```

- **Props**:
  - `icon`: Use `Icons` enum to select the icon name.
  - `iconSize`: Define the size using your app's predefined size keys (`small`, `medium`, `large`, etc.).
  - `color`: Choose the icon color, which maps to your app’s theme colors.

### Image Icons

The `AppIcon.Image` component supports rendering image icons. Developers can use either the `IconsPath` or `IconsURL` enums for the `source` prop.

```typescript
import AppIcon from './AppIcon';
import { IconsPath, IconsURL } from './AppIconsDir';

// Using a local image
<AppIcon.Image iconSize="medium" source={IconsPath.testPath} style={{ borderRadius: 8 }} />

// Using a URL for an image
<AppIcon.Image iconSize="medium" source={{ uri: IconsURL.testURL }} />
```

- **Props**:
  - `iconSize`: Define the icon size based on your app’s predefined sizes.
  - `source`: Use `IconsPath` for local images and `IconsURL` for image URLs.
  - `style`: (Optional) Apply custom styles to the image.

### SVG Icons

The `AppIcon.Svg` component renders SVG icons. Pass a JSX SVG component as the `svg` prop for rendering.

```typescript
import AppIcon from './AppIcon';
import MySvgIcon from '../../assets/icons/MySvgIcon.svg';

<AppIcon.Svg svg={MySvgIcon} iconSize="large" color="secondary" />
```

- **Props**:
  - `svg`: Provide the SVG component directly as JSX.
  - `iconSize`: Define the size using your app’s size keys.
  - `color`: Choose a color, which maps to your theme colors.

---

## Icon Enums

To maintain consistency across the app, developers should use specific enums depending on the icon type:

- **Vector Icons**: Use the `Icons` enum for specifying icons in `<AppIcon />`.
  ```typescript
  export enum Icons {
    home = 'home',
  }
  ```

- **Image Icons**: Use the `IconsPath` enum for local image paths and the `IconsURL` enum for remote image URLs.
  ```typescript
  export enum IconsPath {
    testPath = require('../../assets/images/fire.png'),
  }

  export enum IconsURL {
    testURL = 'https://img.icons8.com/?size=100&id=YBsdeHri_vnb&format=png&color=000000',
  }
  ```

- **SVG Icons**: Pass the SVG as a JSX component when using `<AppIcon.Svg />`.