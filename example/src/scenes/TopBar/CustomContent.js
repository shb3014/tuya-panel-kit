import React from 'react';
import { View, Text, Platform } from 'react-native';
import { TYSdk, TopBar } from 'tuya-panel-kit';

const TYNative = TYSdk.native;

const Res = {
  back:
    Platform.OS === 'ios'
      ? require('./res/common_back_ios.png')
      : require('./res/common_back_android.png'),
};

export default () => (
  <TopBar.Container background="#000">
    <TopBar.Action source={Res.back} onPress={TYSdk.Navigator.pop} />
    <TopBar.Content>
      <View
        style={{
          flex: 1,
          alignSelf: 'stretch',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'red',
        }}
      >
        <Text style={{ color: '#fff' }}>Hahaha</Text>
      </View>
    </TopBar.Content>
    <TopBar.Action
      name="edit"
      onPress={() => {
        TYNative.simpleTipDialog('click edit', () => {});
      }}
    />
  </TopBar.Container>
);
