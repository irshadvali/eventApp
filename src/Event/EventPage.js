/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Button,
  TextInput,
  Alert,
  FlatList,
} from 'react-native';
import {
  LoginButton,
  AccessToken,
  LoginManager,
  GraphRequest,
  GraphRequestManager,
} from 'react-native-fbsdk';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch} from 'react-redux';
import {userActions} from '../action/auth.action';
import ASYNCKEYS from '../utils/AsyncKeys';
import fireDb from '../utils/firbase';
import moment from 'moment';
import DatePicker from 'react-native-date-picker';
import Modal from 'react-native-modal';
import {
  showNotification,
  handleScheduleNotification,
  handleCancel,
} from '../utils/notification.android';
var MAXLIST = 4;
const EventPage = () => {
  const dispatch = useDispatch();
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [openSecond, setOpenSecond] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);
  const [eventName, setEventName] = useState('My Event');
  const [ids, setIds] = useState([]);
  const [data, setData] = useState({});
  const [editId, setEditID] = useState();
  const [isEdit, setIsEdit] = useState(false);
  const LogoutBYFb = async () => {
    console.log(LoginManager.logOut());
    try {
      await AsyncStorage.removeItem(ASYNCKEYS.TOKENKEYS);
      await AsyncStorage.getAllKeys()
        .then(keys => AsyncStorage.multiRemove(keys))
        .then(() => console.log('success all clear'));
      dispatch(userActions.userLogout());
      console.log('Storage successfully cleared!');
    } catch (e) {
      console.log('Failed to clear the async storage.');
    }
  };
  useEffect(() => {
    let idList = [];
    try {
      fireDb.child('event').on('value', snapshot => {
        if (snapshot.val() !== null) {
          idList = Object.keys(snapshot.val()).map(id => {
            return {id: id};
          });
        }
        setIds(idList);
        setData(snapshot.val());
      });
    } catch (e) {
      console.log('error', e);
    }
  }, []);

  console.log(startDate);
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const submitData = () => {
    let isValid = moment(startDate).isBefore(moment(endDate));
    if (isValid) {
      let payload = {
        eventName: eventName ? eventName : 'My Event',
        eventStart: moment(startDate).format('LLL'),
        eventEnd: moment(endDate).format('LLL'),
        startD: `${startDate}`,
        endD: `${endDate}`,
      };
      fireDb.child('event').push(payload, err => {
        if (err) {
          Alert.alert('Data not store');
        } else {
          showNotification(
            eventName,
            `Event is Created on ${moment(startDate).format('LLL')}`,
          );
          setStartDate(new Date());
          setEndDate(new Date());
          setEventName('My Name');
 
          //Alert.alert('Data store successfully');
        }
      });
      setModalVisible(!isModalVisible);
    } else {
      Alert.alert('Please enter valid date');
    }
  };

  const cancelEvent = id => {
    fireDb.child(`event/${id}`).remove(err => {
      if (err) {
        Alert.alert(err);
      } else {
        showNotification(
          eventName,
          `Event is cancelled on ${moment(startDate).format('LLL')}`,
        );
        //Alert.alert('Event Cancel successfully');
      }
    });
    console.log(id);
  };

  const updateEvent = () => {
    let isValid = moment(startDate).isBefore(moment(endDate));
    if (isValid) {
      let payload = {
        eventName: eventName ? eventName : 'My Event',
        eventStart: moment(startDate).format('LLL'),
        eventEnd: moment(endDate).format('LLL'),
        startD: `${startDate}`,
        endD: `${endDate}`,
      };
      fireDb.child(`event/${editId}`).set(payload, err => {
        if (err) {
          Alert.alert('Event not update');
          setModalVisible(false);
          setIsEdit(false);
        } else {
          //Alert.alert('Event update successfully');
          setModalVisible(false);
          setIsEdit(false);
          showNotification(
            eventName,
            `Event is updated on ${moment(startDate).format('LLL')}`,
          );
        }
      });
    } else {
      Alert.alert('Please enter valid date');
    }
  };
  const goForUpdate = id => {
    //console.log(data[id]?.startD);
    setEditID(id);
    setEventName(data[id]?.eventName);
    setEndDate(data[id]?.endD);
    setStartDate(data[id]?.startD);
    setIsEdit(true);
    setModalVisible(true);
  };
  const renderItem = (item, index) => {
    console.log(item.item.id);
    return (
      <View
        // eslint-disable-next-line react-native/no-inline-styles
        style={{
          height: 120,
          margin: 5,
          backgroundColor: '#e6e6e6',
          padding: 10,
        }}>
        <Text style={{marginBottom: 10}}>{data[item.item.id]?.eventName}</Text>
        <View style={styles.viewOne}>
          <Text style={styles.text2}>Start Date</Text>
          <Text style={styles.text2}>End Date</Text>
        </View>
        <View style={styles.viewOne}>
          <Text style={styles.text1}>{data[item.item.id]?.eventStart}</Text>
          <Text style={styles.text1}>{data[item.item.id]?.eventEnd}</Text>
        </View>
        <View
          style={{
            width: '100%',
            height: 1,
            backgroundColor: '#d0d0d0',
            marginVertical: 10,
          }}
        />
        <View style={styles.viewOne}>
          <TouchableOpacity onPress={() => cancelEvent(item.item.id)}>
            <Text style={styles.text2}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => goForUpdate(item.item.id)}>
            <Text style={styles.text2}>Edit</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };
  return (
    <SafeAreaView>
      <View style={styles.mainContainer}>
        <View style={styles.topContainer}>
          <Text>{'Event List'}</Text>

          <TouchableOpacity
            onPress={() => {
              LogoutBYFb();
            }}>
            <Text>Logout</Text>
          </TouchableOpacity>
        </View>
        <FlatList
          data={ids}
          renderItem={(item, index) => renderItem(item, index)}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.flatListStyle}
        />

        <Modal isVisible={isModalVisible}>
          <View style={{width: '100%', height: 300, backgroundColor: 'white'}}>
            <Text style={styles.sectionTitle}>Create Event</Text>
            <TextInput
              style={styles.textInput}
              placeholder="Event Name"
              value={eventName ? eventName : ''}
              onChangeText={val => setEventName(val)}
            />
            <View style={styles.topContainer}>
              <Text style={styles.textDate}>Start Date</Text>
              <Text style={styles.textDate}>End Date</Text>
            </View>
            <View style={styles.topContainer}>
              <TouchableOpacity onPress={() => setOpen(true)}>
                <Text style={styles.dateButton}>
                  {startDate
                    ? moment(startDate).format('LLL')
                    : 'Select Start Date'}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setOpenSecond(true)}>
                <Text style={styles.dateButton}>
                  {endDate ? moment(endDate).format('LLL') : 'Select End Date'}
                </Text>
              </TouchableOpacity>
            </View>
            <DatePicker
              modal
              open={open}
              date={new Date()}
              onConfirm={date => {
                setOpen(false);
                setStartDate(date);
                console.log(date);
              }}
              onCancel={() => {
                setOpen(false);
              }}
            />
            <DatePicker
              modal
              open={openSecond}
              date={new Date()}
              onConfirm={date => {
                setOpenSecond(false);
                setEndDate(date);
                console.log(endDate);
              }}
              onCancel={() => {
                setOpenSecond(false);
              }}
            />
            <View style={styles.buttonContainer}>
              <TouchableOpacity onPress={toggleModal}>
                <Text style={[styles.submitButton, {backgroundColor: 'red'}]}>
                  Cancel
                </Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={isEdit ? updateEvent : submitData}>
                <Text style={styles.submitButton}>Submit</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        <TouchableOpacity
          disabled={ids.length < MAXLIST ? false : true}
          style={[
            styles.footerButton,
            {backgroundColor: ids.length < MAXLIST ? 'blue' : '#d0d0d0'},
          ]}
          onPress={() => {
            setModalVisible(true);
          }}>
          <Text
            style={[
              styles.submitButton,
              {backgroundColor: ids.length < MAXLIST ? 'blue' : '#d0d0d0'},
            ]}>
            Click to Add Event
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    padding: 10,
    height: '100%',
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    padding: 10,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
  topContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  footerButton: {
    position: 'absolute',
    bottom: 0,
    left: 10,
    height: 50,
    width: '100%',
    backgroundColor: 'blue',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textInput: {
    height: 50,
    padding: 10,
    borderWidth: 1,
    borderColor: '#cccccc',
    margin: 5,
  },
  textDate: {
    fontSize: 14,
    fontWeight: '200',
    padding: 10,
  },
  dateButton: {
    fontSize: 12,
    fontWeight: '200',
    paddingHorizontal: 10,
    color: '#000000',
  },
  buttonContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    position: 'absolute',
    bottom: 20,
  },
  submitButton: {
    backgroundColor: 'blue',
    fontSize: 14,
    color: '#ffffff',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  viewOne: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  text2: {
    fontSize: 14,
    color: ' #000000',
  },
  text1: {
    fontSize: 14,
    fontWeight: '100',
  },
  flatListStyle: {
    paddingBottom: 80,
  },
});

export default EventPage;
