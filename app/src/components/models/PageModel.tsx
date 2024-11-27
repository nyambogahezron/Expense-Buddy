import {
  Dimensions,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import Modal from 'react-native-modal';
import AntDesign from '@expo/vector-icons/AntDesign';
import { ThemedView } from '../Themed';
import { useTheme } from '@/context/ThemeProvider';

const { height, width } = Dimensions.get('window');

type pageModelProps = {
  isModalVisible: boolean;
  toggleModal: () => void;
  title?: string;
  children: React.ReactNode;
};

export default function PageModel({
  isModalVisible,
  toggleModal,
  title,
  children,
}: pageModelProps) {
  const { theme } = useTheme();
  const styles = createStyles(theme);

  return (
    <Modal isVisible={isModalVisible} deviceWidth={width} deviceHeight={height} backdropColor='blue'>
      <ThemedView style={styles.container}>
        <View style={styles.modalView}>
          <View style={styles.header}>
            {title && <Text style={styles.title}>{title}</Text>}
            <TouchableOpacity onPress={toggleModal}>
              <AntDesign
                name='close'
                size={24}
                color={theme === 'light' ? '#000' : '#fff'}
              />
            </TouchableOpacity>
          </View>
          {children}
        </View>
      </ThemedView>
    </Modal>
  );
}

const createStyles = (theme: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    modalView: {
      alignItems: 'center',
      height: '100%',
      width: width,
      borderTopRightRadius: 5,
      borderTopLeftRadius: 5,
    },
    header: {
      flexDirection: 'row',
      top: 0,
      justifyContent: 'space-between',
      alignItems: 'center',
      width: '100%',
      padding: 8,
      borderBottomColor: theme === 'light' ? '#ccc' : '#000',
      borderBottomWidth: 1,
      borderTopRightRadius: 5,
      borderTopLeftRadius: 5,
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
      backgroundColor: theme === 'light' ? '#f9f9f9' : '#070B11',
      zIndex: 1,
    },
    title: {
      fontSize: 15,
      fontWeight: 'bold',
      color: theme === 'light' ? '#333' : '#fff',
    },
  });
