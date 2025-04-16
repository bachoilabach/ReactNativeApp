import React from 'react';
import Svg, { Path } from 'react-native-svg';

export function UserIcon({color}: {color: string}) {
    return (
        <Svg
        fill={color}
            width={24}
            height={24}
            viewBox="0 0 24 24">
            <Path
                d="M12 4a4 4 0 0 1 4 4a4 4 0 0 1-4 4a4 4 0 0 1-4-4a4 4 0 0 1 4-4m0 10c4.42 0 8 1.79 8 4v2H4v-2c0-2.21 3.58-4 8-4"
                strokeWidth={0.5}
                stroke={color}
            />
        </Svg>
    );
}
