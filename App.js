import React, { Component } from 'react';
import { StyleSheet, Text, View, ScrollView, Image } from 'react-native';
import { Font, AppLoading } from 'expo';
import { Container, Header, Left, Body, Right, Title, Content, Spinner, Button, Icon } from 'native-base';
import { ReactiveBase, DataSearch, ReactiveList } from '@appbaseio/reactivesearch-native';
export default class HeaderTitleExample extends Component {
     constructor(props) {
    super(props);
    this.state = { loading: true };
  }

  async componentWillMount() {
    await Font.loadAsync({
      Roboto: require("native-base/Fonts/Roboto.ttf"),
      Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf")
    });
    this.setState({ loading: false });
  }

  render() {
    if (this.state.loading) {
      return (
       <Container>
        <Header />
        <Content>
          <Spinner color='blue' />
        </Content>
      </Container>
      );
    }
    return (
       <Container >
        <Header style={{backgroundColor: "#a7f449"}}>
          <Left>
            <Button transparent>
              <Icon name='menu' />
            </Button>
          </Left>
          <Body>
           
          </Body>
        </Header>
        <ReactiveBase app="plantTrees" credentials="ZTNsIxjZd:de141fa7-5716-4053-b9fd-66354eb5ec73">
              <ScrollView>
          <View style={styles.container}>
            <DataSearch
              componentId="searchbox"
              dataField={[
                'tree_name',
                'tree_name.search',
                'tree_category',
                'tree_category.search',
              ]}
              placeholder="Search for Trees"
              autosuggest={false}
            />
            <ReactiveList
              componentId="results"
              dataField="tree_name"
              size={7}
              showResultStats={false}
              pagination={true}
              react={{
                and: "searchbox"
              }}
              onData={(res) => (
                <View style={styles.result}>
                  <Image source={{ uri: res.image }} style={styles.image} />
                  <View style={styles.item}>
                    <Text style={styles.title}>{res.tree_name}</Text>
                    <Text>{res.tree_category}</Text>
                  </View>
                </View>
              )  }style={{backgroundColor: "#ffffff"}}
            />
          </View>
        </ScrollView>
        
        </ReactiveBase>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    marginTop: 25
  },
  image: {
    width: 100,
    height: 100
  },
  result: {
    flexDirection: 'row',
    width: '100%',
    margin: 5,
    alignItems: 'center',
  },
  item: {
    flexDirection: 'column',
    paddingLeft: 10
  },
  title: {
    fontWeight: 'bold'
  }
});