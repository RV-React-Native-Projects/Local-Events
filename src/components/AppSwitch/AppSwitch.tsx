import React from 'react';
import { Switch, SwitchProps } from 'react-native';
import { useAppTheme } from '@redux/hooks';

type Props = SwitchProps & {};

const AppSwitch = (props: Props) => {
  const {} = props;
  const { colors } = useAppTheme();
  return (
    <Switch
      thumbColor={colors.onPrimary}
      trackColor={{
        false: colors.secondary,
        true: colors.primary,
      }}
      {...props}
    />
  );
};

export default React.memo(AppSwitch);
