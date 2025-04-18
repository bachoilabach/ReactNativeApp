import React from 'react';
import Svg, { Path } from 'react-native-svg';

export function UserIcon({ color }: { color: string }) {
  return (
    <Svg fill={color} width={24} height={24} viewBox="0 0 24 24">
      <Path
        d="M12 4a4 4 0 0 1 4 4a4 4 0 0 1-4 4a4 4 0 0 1-4-4a4 4 0 0 1 4-4m0 10c4.42 0 8 1.79 8 4v2H4v-2c0-2.21 3.58-4 8-4"
        strokeWidth={0.5}
        stroke={color}
      />
    </Svg>
  );
}

export function PostIcon({ color }: { color: string }) {
  return (
    <Svg fill={color} width={27} height={27} viewBox="0 0 24 24">
      <Path
        d="M18.385 20H5.615q-.666 0-1.14-.475T4 18.386V5.615q0-.666.475-1.14T5.615 4h12.77q.666 0 1.14.475T20 5.615v12.77q0 .666-.475 1.14t-1.14.475m-.154-3.346H5.769v1.807h12.462zm-12.462-.885h12.462v-1.808H5.769zm0-2.923h12.462V5.77H5.769zm0 3.808v1.807zm0-.885v-1.808zm0-2.923V5.77zm0 1.115v-1.115zm0 2.693v-.885z"
        strokeWidth={0.5}
        stroke={color}
      />
    </Svg>
  );
}

export const EditIcon = () => {
  return (
    <Svg
      width={27}
      height={27}
      viewBox="0 0 24 24"
      fill={'black'}
    >
      <Path
        d="M10 14v-2.615l8.944-8.944q.166-.166.348-.23t.385-.063q.189 0 .368.064t.326.21L21.483 3.5q.16.166.242.365t.083.4t-.061.382q-.06.18-.226.345L12.52 14zm9.466-8.354l1.347-1.361l-1.111-1.17l-1.387 1.381zM5.615 20q-.691 0-1.153-.462T4 18.384V5.616q0-.691.463-1.153T5.616 4h8.386l-6.386 6.387v5.998h5.896L20 9.895v8.489q0 .69-.462 1.153T18.384 20z"
        strokeWidth={0.5}
        stroke={'black'}
      />
    </Svg>
  );
};
