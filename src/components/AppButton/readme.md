# AppButton Component

The `AppButton` component is a versatile and customizable button component for React Native apps. It supports various styles, colors, sizes, icons, and states to fit different use cases.

## Table of Contents
- [Installation](#installation)
- [Props](#props)
- [Usage](#usage)
  - [Filled Button](#filled-button)
  - [Outline Button](#outline-button)
  - [Ghost Button](#ghost-button)
  - [Icon Button](#icon-button)
  - [Button Colors](#button-colors)
  - [Button Sizes](#button-sizes)
  - [Button Radius](#button-radius)

---

### Installation
Simply import the component into your project:

```javascript
import AppButton from './AppButton';
```

---

## Props

| Prop           | Type                                      | Description                                                                 |
|----------------|------------------------------------------|-----------------------------------------------------------------------------|
| `text`         | `string`                                 | Button text                                                                 |
| `variant`      | `'filled'` \| `'outline'` \| `'ghost'`   | Button style variant                                                        |
| `size`         | `'half'` \| `'standard'` \| `'full'` \| `'icon-button'` \| `'card-button'` | Button size option                  |
| `color`        | `'primary'` \| `'secondary'` \| `'danger'` \| `'success'` \| `'disable'`   | Button color                                                               |
| `radius`       | `'zero'` \| `'normal'` \| `'full'`       | Corner radius of the button                                                 |
| `isLoading`    | `boolean`                                | Shows loading state (replaces text with "Loading...")                       |
| `renderIcon`   | `(color: ColorValue) => React.ReactNode` | Function to render an icon in the button                                    |
| `iconPosition` | `'leading'` \| `'trailing'` \| `'center-left'` \| `'center-right'` | Position of icon within button |
| `onPress`      | `() => void`                             | Function to call when the button is pressed                                 |

---

## Usage

### Filled Button
The filled button is the default style. It provides a solid background color.

```typescript
<AppButton text="Primary Filled" color="primary" />
<AppButton text="Secondary Filled" color="secondary" />
```

### Outline Button
The outline button has a border and no background color. It’s useful for a less prominent button style.

```typescript
<AppButton text="Primary Outline" variant="outline" color="primary" />
<AppButton text="Danger Outline" variant="outline" color="danger" />
```

### Ghost Button
The ghost button has no background or border and is useful for minimal UI elements.

```typescript
<AppButton text="Primary Ghost" variant="ghost" color="primary" />
<AppButton text="Success Ghost" variant="ghost" color="success" />
```

### Icon Button
The icon button is a flexible style that supports buttons with only icons, as well as icons with text. 

- **Icon Only**: Use `size="icon-button"` and `renderIcon`.

```typescript
<AppButton
  size="icon-button"
  renderIcon={color => (
    <AppIcon icon={Icons.home} color={color} iconSize="md" />
  )}
  color="primary"
/>
```

- **Icon with Text**: Use `renderIcon` along with `iconPosition` to specify where the icon should appear relative to the text.

```typescript
<AppButton
  text="With Icon"
  renderIcon={color => (
    <AppIcon icon={Icons.search} color={color} iconSize="md" />
  )}
  iconPosition="leading"
  color="secondary"
/>
```

### Button Colors
The `AppButton` supports five predefined colors:

| Color      | Description                               |
|------------|-------------------------------------------|
| `primary`  | Main color for primary action buttons     |
| `secondary`| Secondary color for less prominent actions|
| `danger`   | Color for destructive actions             |
| `success`  | Color for success-related actions         |
| `disable`  | Disabled color, non-clickable             |

Example:

```typescript
<AppButton text="Danger Filled" color="danger" />
<AppButton text="Success Ghost" variant="ghost" color="success" />
```

### Button Sizes
The `AppButton` component supports multiple sizes for different use cases:

| Size          | Description                                |
|---------------|--------------------------------------------|
| `half`        | Half-width button                          |
| `standard`    | Standard width (default)                   |
| `full`        | Full-width button                          |
| `icon-button` | Small button, suitable for icons only      |
| `card-button` | Button size used in cards or similar spaces|

Example:

```typescript
<AppButton text="Standard Button" size="standard" color="primary" />
<AppButton text="Full Button" size="full" color="secondary" />
```

### Button Radius
The `AppButton` has three radius options to control the button’s corner style:

| Radius Option | Description                            |
|---------------|----------------------------------------|
| `zero`        | Square corners                         |
| `normal`      | Default rounded corners                |
| `full`        | Fully rounded for circular buttons     |

Example:

```typescript
<AppButton text="Square Button" radius="zero" color="primary" />
<AppButton text="Rounded Button" radius="full" color="secondary" />
```

---

## Full Example Usage

Here’s a complete example showcasing different button variants and styles:

```typescript
// Filled Button
<AppButton text="Primary Filled" color="primary" />

// Outline Button
<AppButton text="Outline" variant="outline" color="danger" />

// Ghost Button
<AppButton text="Ghost" variant="ghost" color="success" />

// Icon Button
<AppButton
  size="icon-button"
  renderIcon={color => <AppIcon icon={Icons.search} color={color} iconSize="md" />}
  color="primary"
/>

// Icon with Text
<AppButton
  text="Search"
  renderIcon={color => <AppIcon icon={Icons.search} color={color} iconSize="md" />}
  iconPosition="leading"
  color="primary"
/>
