class CustomDrawerContentComponent extends Component {
  render() {
    const { theme, user } = this.props;
    const ripple = TouchableNativeFeedback.Ripple('#adacac', false);

    return (
      <View style={{ flex: 1 }}>

        <ScrollView>
          <SafeAreaView
            style={styles.container}
            forceInset={{ top: 'always', horizontal: 'never' }}
          >
            <View style={[ styles.containHeader, { backgroundColor: theme.pri700 }]}>
              <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                <Avatar size='large' rounded icon={{ name: 'user-circle-o', type: 'font-awesome', size: 80 }} />
                <Text style={{ color: '#f9f9f9', marginTop: '3%', fontFamily: 'sans-serif-condensed' }}>{`Hi ${user.firstname}`}</Text>
                <Text style={{ color: '#f9f9f9', fontFamily: 'sans-serif-condensed' }}>{`${user.email}`}</Text>
              </View>
            </View>

            <DrawerItems {...this.props} />

            <View>
              <View style={{ marginTop: '2%' }}>
                <Divider style={{ backgroundColor: '#777f7c90' }} />
              </View>
              <View style={{ marginTop: '3%' }}>
                <ColorPalette />
              </View>
              <View style={{ marginTop: '5%' }}>
                <Divider style={{ backgroundColor: '#777f7c90' }} />
              </View>
            </View>
          </SafeAreaView>
        </ScrollView>

        <View elevation={6} style={{ backgroundColor: '#ffffff' }}>
          <TouchableNativeFeedback background={ripple}>
            <View style={styles.containDrawerOption}>
              <Icon
                name='logout'
                type='simple-line-icon'
                size={20}
                color={theme.pri700}
                containerStyle={{ marginRight: '10%' }}
              />
              <Text style={{ color: 'black', fontFamily: 'sans-serif-medium' }}>Logout</Text>
            </View>
          </TouchableNativeFeedback>

          <TouchableNativeFeedback background={ripple}>
            <View style={styles.containDrawerOption}>
              <Icon
                name='user-secret'
                type='font-awesome'
                size={24}
                color={theme.pri700}
                containerStyle={{ marginRight: '10%' }}
              />
              <Text style={{ color: 'black', fontFamily: 'sans-serif-medium' }}>Developer</Text>
            </View>
          </TouchableNativeFeedback>
        </View>

      </View>
    );
  }
}