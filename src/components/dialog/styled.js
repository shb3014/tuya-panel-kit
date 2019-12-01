import { View, TouchableOpacity, TextInput, StyleSheet } from 'react-native';
import styled from 'styled-components/native';
import { RatioUtils } from '../../utils';
import TYFlatList from '../TYLists/list';
import TYText from '../TYText';
import { dialog } from '../theme/theme-get';

const { convertX: cx } = RatioUtils;

const {
  width,
  radius,
  bgColor,
  lineColor,
  cellHeight,
  titleFontSize,
  titleFontColor,
  subTitleFontSize,
  subTitleFontColor,
  cancelFontSize,
  cancelFontColor,
  confirmFontSize,
  confirmFontColor,
  prompt,
} = dialog;

/**
 * Common Dialog Variants
 */
export const StyledContainer = styled(View)`
  width: ${width}px;
  align-self: center;
  align-items: center;
  justify-content: center;
  border-radius: ${radius};
  background-color: ${bgColor};
`;

export const StyledHeader = styled(View)`
  align-self: stretch;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  border-bottom-width: ${StyleSheet.hairlineWidth};
  border-bottom-color: ${lineColor};
  height: ${cellHeight}px;
`;

export const StyledContent = styled(View)`
  padding: ${cx(16)}px;
  align-self: stretch;
  align-items: center;
  justify-content: center;
`;

export const StyledFooter = styled(View)`
  align-self: stretch;
  flex-direction: row;
  border-top-width: ${StyleSheet.hairlineWidth};
  border-top-color: ${lineColor};
  height: ${cellHeight}px;
`;

export const StyledTitle = styled(TYText)`
  font-weight: 500;
  font-size: ${titleFontSize}px;
  text-align: center;
  color: ${titleFontColor};
`;

export const StyledSubTitle = styled(TYText)`
  margin-top: 7px;
  font-size: ${subTitleFontSize}px;
  text-align: center;
  color: ${subTitleFontColor};
`;

export const StyledButton = styled(TouchableOpacity).attrs({
  activeOpacity: 0.8,
})`
  flex: 1;
  align-items: center;
  justify-content: center;
  border-right-width: ${props => (props.bordered ? StyleSheet.hairlineWidth : 0)};
  border-right-color: ${lineColor};
`;

export const StyledCancelText = styled(TYText)`
  font-size: ${cancelFontSize}px;
  text-align: center;
  color: ${cancelFontColor};
`;

export const StyledConfirmText = styled(TYText)`
  font-weight: bold;
  font-size: ${confirmFontSize}px;
  text-align: center;
  color: ${confirmFontColor};
`;

/**
 * Prompt Variants
 */

export const StyledInputContainer = styled(View)`
  justify-content: center;
  border-radius: ${prompt.radius}
  align-self: stretch;
  margin-top: 16px;
  padding: ${prompt.padding};
  background-color: ${prompt.bg};
  border-color: ${lineColor};
  border-width: ${StyleSheet.hairlineWidth};
`;

export const StyledInput = styled(TextInput).attrs({
  placeholderTextColor: prompt.placeholder,
  underlineColorAndroid: 'transparent',
})`
  font-size: ${subTitleFontSize};
  color: ${titleFontColor};
  padding: 0px;
`;

/**
 * Checkbox variants
 */
export const StyledCheckboxList = styled(TYFlatList)`
  align-self: stretch;
  background-color: ${bgColor};
`;

/**
 * List variants
 */
export const StyledList = styled(TYFlatList)`
  margin-top: ${cx(16)}px;
  align-self: stretch;
  background-color: ${bgColor};
  border-top-color: ${lineColor};
  border-top-width: ${StyleSheet.hairlineWidth};
  border-bottom-left-radius: ${radius};
  border-bottom-right-radius: ${radius};
`;
