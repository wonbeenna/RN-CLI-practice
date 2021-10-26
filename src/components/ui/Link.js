import React from 'react';
import {Pressable} from 'react-native';
import styled from 'styled-components';
import Paragraph from './Paragraph';

const Padding = styled.View``;

export default function Link({children, onPress}) {
  return (
    <Pressable onPress={onPress}>
      <Paragraph>{children}</Paragraph>
    </Pressable>
  );
}
