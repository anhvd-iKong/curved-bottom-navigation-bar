import React, { memo } from 'react';
import isEqual from 'react-fast-compare';
import Animated, {
  useAnimatedReaction,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import { sharedTiming } from '../../AnimatedHelper';

interface IconDotProps {
  index: number;
  selectedIndex: Animated.SharedValue<number>;
  children: React.ReactNode;
}

const IconDotComponent = (props: IconDotProps) => {
  // props
  const { index, selectedIndex, children } = props;

  // reanimated
  const progress = useSharedValue(0);
  useAnimatedReaction(
    () => selectedIndex.value === index,
    (result, prevValue) => {
      if (result !== prevValue) {
        progress.value = sharedTiming(result ? 1 : 0);
      }
    }
  );
  // const opacity = useInterpolate(progress, [0, 0.6, 1], [0, 0, 1]);
  // const scale = useInterpolate(progress, [0, 1], [0.2, 1]);

  // reanimated style
  const style = useAnimatedStyle(() => ({
    position: 'absolute',
    // opacity: opacity.value,
    // transform: [{ scale: scale.value }],
  }));

  // render
  return <Animated.View style={[style]}>{children}</Animated.View>;
};

export const IconDot = memo(IconDotComponent, isEqual);
