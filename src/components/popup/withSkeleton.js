/* eslint-disable react/no-array-index-key */
import React from 'react';
import { ViewPropTypes } from 'react-native';
import PropTypes from 'prop-types';
import Modal from '../modal';
import TYModal from '../modal/TYModal';
import TYText from '../TYText';
import {
  StyledContainer,
  StyledTitle,
  StyledTitleText,
  StyledSwitch,
  StyledFooter,
  StyledButton,
  StyledCancelText,
  StyledConfirmText,
} from './styled';

/**
 *
 * @param {ReactElement} WrappedComponent
 * @param {Boolean} withModal - 是否包含在Modal组件内
 */
const withSkeleton = (WrappedComponent, withModal = false) => {
  // 同步1.x
  const name = WrappedComponent.displayName || '';
  const ACCESSIBILITY_LABEL_MAP = {
    CountdownPopup: 'Popup_CountdownPicker',
    DatePickerPopup: 'Popup_DatePicker',
    TimerPickerPopup: 'Popup_TimerPicker',
    NumberSelectorPopup: 'Popup_NumberSelector',
    ListPopup: 'Popup_List',
    PickerPopup: 'Popup_Picker',
    Custom: 'Popup_Custom',
  };
  const accessPrefix = ACCESSIBILITY_LABEL_MAP[name] || 'Popup';
  return class WrapperComponent extends React.Component {
    static propTypes = {
      ...TYModal.propTypes,
      wrapperStyle: ViewPropTypes.style,
      title: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.string),
        PropTypes.string,
        PropTypes.element,
      ]),
      titleTextStyle: TYText.propTypes.style,
      titleWrapperStyle: ViewPropTypes.style,

      /**
       * 头部栏 Switch 值
       */
      switchValue: PropTypes.bool,
      /**
       * 头部栏 Switch Change事件，不用onValueChange的原因是避免props重复
       */
      onSwitchValueChange: PropTypes.func,
      onCancel: PropTypes.func,
      onConfirm: PropTypes.func,
      cancelText: PropTypes.string,
      confirmText: PropTypes.string,
      cancelTextStyle: TYText.propTypes.style,
      confirmTextStyle: TYText.propTypes.style,
      footer: PropTypes.element,
      footerWrapperStyle: ViewPropTypes.style,
      footerType: PropTypes.oneOf(['singleConfirm', 'singleCancel', 'custom', 'both']),
    };

    static defaultProps = {
      title: 'Modal',
      titleTextStyle: null,
      titleWrapperStyle: null,
      wrapperStyle: null,

      switchValue: undefined,
      onSwitchValueChange: null,
      onCancel: () => {},
      onConfirm: () => {},
      cancelText: 'Cancel',
      confirmText: 'Confirm',
      cancelTextStyle: null,
      confirmTextStyle: null,
      footer: null,
      footerWrapperStyle: null,
      footerType: 'both',
    };

    constructor(props) {
      super(props);
      this.extraParams = [];
      this.state = {
        switchValue: props.switchValue,
      };
    }

    onDataChange = (data, ...extraParams) => {
      this.data = data;
      this.extraParams = extraParams;
    };

    getData = () => {
      return this.data;
    };

    _handleSwitchValueChange = switchValue => {
      const { onSwitchValueChange } = this.props;
      this.setState({ switchValue });
      onSwitchValueChange && onSwitchValueChange(switchValue);
    };

    renderTitle = () => {
      const { title, titleTextStyle, titleWrapperStyle } = this.props;
      if (React.isValidElement(title)) return title;
      const titleArray = Array.isArray(title) ? title : [title];
      return (
        <StyledTitle style={titleWrapperStyle}>
          {titleArray.map((t, idx) => (
            <StyledTitleText key={idx} style={titleTextStyle}>
              {t}
            </StyledTitleText>
          ))}
          {typeof this.state.switchValue === 'boolean' && (
            <StyledSwitch
              accessibilityLabel={`${accessPrefix}_Switch`}
              useNativeDriver={false} // 与 Modal 共用暂时有bug
              value={this.state.switchValue}
              onValueChange={this._handleSwitchValueChange}
            />
          )}
        </StyledTitle>
      );
    };

    renderFooter = () => {
      const {
        footer,
        footerType,
        cancelText,
        confirmText,
        onCancel,
        onConfirm,
        footerWrapperStyle,
        cancelTextStyle,
        confirmTextStyle,
      } = this.props;
      if (footer) return footer;
      const showConfirm = footerType === 'both' || footerType === 'singleConfirm';
      const showCancel = footerType === 'both' || footerType === 'singleCancel';
      return (
        <StyledFooter style={footerWrapperStyle}>
          {showCancel ? (
            <StyledButton
              accessibilityLabel={`${accessPrefix}_Cancel`}
              bordered={footerType === 'both'}
              onPress={onCancel}
            >
              <StyledCancelText style={cancelTextStyle} single={footerType === 'singleCancel'}>
                {cancelText}
              </StyledCancelText>
            </StyledButton>
          ) : null}
          {showConfirm ? (
            <StyledButton
              accessibilityLabel={`${accessPrefix}_Confirm`}
              onPress={() => onConfirm && onConfirm(this.data, ...this.extraParams)}
            >
              <StyledConfirmText style={confirmTextStyle}>{confirmText}</StyledConfirmText>
            </StyledButton>
          ) : null}
        </StyledFooter>
      );
    };

    render() {
      const {
        // 以下为 Modal 通用 props
        visible,
        animationType,
        alignContainer,
        mask,
        maskStyle,
        onMaskPress,
        onShow,
        onHide,
        onDismiss,
        // 以上为 Modal 通用 props
        // 以下为 skeleton 通用 props
        title,
        titleTextStyle,
        titleWrapperStyle,
        footer,
        cancelText,
        confirmText,
        onCancel,
        footerWrapperStyle,
        cancelTextStyle,
        confirmTextStyle,
        // 以上为 skeleton 通用 props
        wrapperStyle,
        ...props
      } = this.props;
      const { switchValue } = this.state;
      const element = (
        <StyledContainer style={wrapperStyle}>
          {this.renderTitle()}
          <WrappedComponent
            {...props}
            switchValue={typeof switchValue === 'undefined' ? true : switchValue}
            _onDataChange={this.onDataChange}
          />
          {this.renderFooter()}
        </StyledContainer>
      );
      return withModal ? (
        <Modal
          visible={visible}
          animationType={animationType}
          alignContainer={alignContainer}
          mask={mask}
          maskStyle={maskStyle}
          onMaskPress={onMaskPress}
          onShow={onShow}
          onHide={onHide}
          onDismiss={onDismiss}
        >
          {element}
        </Modal>
      ) : (
        element
      );
    }
  };
};

export default withSkeleton;
