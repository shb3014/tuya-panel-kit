import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { ViewPropTypes } from 'react-native';
import TYFlatList from '../TYLists/list';
import TYText from '../TYText';
import Footer from './footer';
import {
  StyledContainer,
  StyledHeader,
  StyledTitle,
  StyledSubTitle,
  StyledCheckboxList,
} from './styled';

const ITEM_HEIGHT = 48;

export default class CheckBoxDialog extends Component {
  static propTypes = {
    /**
     * CheckBox 类型: 单选 or 多选
     */
    type: PropTypes.oneOf(['radio', 'switch']),
    /**
     * 选中的值
     * 单选为 string 或者 number, 多选类型为 array
     */
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.array]).isRequired,
    /**
     * 最大列表项
     */
    maxItemNum: PropTypes.number,
    /**
     * Checkbox 数据源，其中 value 必填, 除 value 外可为 `CheckboxItem` props
     */
    dataSource: PropTypes.arrayOf(
      PropTypes.shape({
        ...TYFlatList.CheckboxItem.propTypes,
        value: PropTypes.string.isRequired,
      })
    ).isRequired,
    /**
     * Checkbox 变更回调事件
     */
    onChange: PropTypes.func,
    style: ViewPropTypes.style,
    headerStyle: ViewPropTypes.style,
    titleNumberOfLines: PropTypes.number,
    title: PropTypes.string.isRequired,
    titleStyle: TYText.propTypes.style,
    subTitle: PropTypes.string,
    subTitleStyle: TYText.propTypes.style,
    contentStyle: ViewPropTypes.style,
    footerWrapperStyle: ViewPropTypes.style,
    cancelText: PropTypes.string.isRequired,
    cancelTextStyle: TYText.propTypes.style,
    cancelAccessibilityLabel: PropTypes.string,
    confirmText: PropTypes.string.isRequired,
    confirmTextStyle: TYText.propTypes.style,
    confirmAccessibilityLabel: PropTypes.string,
    onCancel: PropTypes.func,
    onConfirm: PropTypes.func,
  };

  static defaultProps = {
    type: 'radio',
    maxItemNum: 5,
    style: null,
    headerStyle: null,
    titleNumberOfLines: 2,
    titleStyle: null,
    subTitle: '',
    subTitleStyle: null,
    contentStyle: null,
    footerWrapperStyle: null,
    cancelTextStyle: null,
    cancelAccessibilityLabel: 'Dialog.Cancel',
    confirmTextStyle: null,
    confirmAccessibilityLabel: 'Dialog.Confirm',
    onChange: null,
    onCancel: null,
    onConfirm: null,
  };

  constructor(props) {
    super(props);
    this.state = {
      value: props.value,
    };
    if (props.type === 'switch' && !Array.isArray(props.value)) {
      console.warn('CheckBoxDialog: 复选框的 value 必须为 数组');
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.state.value !== nextProps.value) {
      this.setState({ value: nextProps.value });
    }
  }

  isChecked(value) {
    const { type } = this.props;
    if (type === 'radio') {
      return this.state.value === value;
    } else if (type === 'switch') {
      return this.state.value.some(v => v === value);
    }
    return false;
  }

  _handleCheckBoxChange = (checked, value) => {
    const { type, onChange } = this.props;
    if (type === 'radio') {
      this.setState(() => {
        const newValue = checked ? value : undefined;
        onChange && onChange(newValue);
        return { value: newValue };
      });
    } else if (type === 'switch') {
      this.setState(prevState => {
        let newValue = Array.isArray(prevState.value) ? prevState.value : [];
        if (checked) newValue = [...newValue, value];
        else newValue = newValue.filter(v => v !== value);
        onChange && onChange(newValue);
        return { value: newValue };
      });
    }
  };

  _handleConfirm = () => {
    const { onConfirm } = this.props;
    onConfirm && onConfirm(this.state.value);
  };

  renderCheckBoxItem = ({ item }) => {
    const { styles = {}, value, title, ...checkboxProps } = item;
    const isChecked = this.isChecked(value);
    return (
      <TYFlatList.CheckboxItem
        styles={{
          ...styles,
          container: [{ height: ITEM_HEIGHT }, styles.container],
          title: [{ fontSize: 16, color: '#333' }, styles.title],
        }}
        color={isChecked ? '#44DB5E' : '#e5e5e5'}
        {...checkboxProps}
        title={title || value}
        checked={isChecked}
        onChange={checked => this._handleCheckBoxChange(checked, value)}
      />
    );
  };

  render() {
    const {
      maxItemNum,
      style,
      headerStyle,
      titleNumberOfLines,
      title,
      titleStyle,
      subTitle,
      subTitleStyle,
      contentStyle,
      dataSource,
      confirmText,
      confirmTextStyle,
      confirmAccessibilityLabel,
      footerWrapperStyle,
      cancelText,
      cancelTextStyle,
      cancelAccessibilityLabel,
      onCancel,
      ...TYFlatListProps
    } = this.props;
    return (
      <StyledContainer style={style}>
        <StyledHeader style={headerStyle}>
          <StyledTitle style={titleStyle} numberOfLines={titleNumberOfLines}>
            {title}
          </StyledTitle>
          {!!subTitle && <StyledSubTitle style={subTitleStyle}>{subTitle}</StyledSubTitle>}
        </StyledHeader>
        <StyledCheckboxList
          style={[contentStyle, { maxHeight: ITEM_HEIGHT * maxItemNum }]}
          scrollEnabled={dataSource.length > maxItemNum}
          keyExtractor={item => item.value}
          data={dataSource}
          renderItem={this.renderCheckBoxItem}
          {...TYFlatListProps}
        />
        <Footer
          style={footerWrapperStyle}
          cancelTextStyle={cancelTextStyle}
          confirmTextStyle={confirmTextStyle}
          cancelText={cancelText}
          confirmText={confirmText}
          cancelAccessibilityLabel={cancelAccessibilityLabel}
          confirmAccessibilityLabel={confirmAccessibilityLabel}
          onCancel={onCancel}
          onConfirm={this._handleConfirm}
        />
      </StyledContainer>
    );
  }
}
