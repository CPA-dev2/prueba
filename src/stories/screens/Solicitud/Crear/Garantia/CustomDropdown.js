import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  FlatList,
  StyleSheet,
  TouchableWithoutFeedback,
} from 'react-native';
import PropTypes from 'prop-types';
// import { Ionicons } from '@expo/vector-icons'; // Opcional:se puede reemplazar biblioteca de íconos

const CustomDropdown = ({
  data,
  selectedValue,
  onValueChange,
  placeholder,
  labelField,
  valueField,
  containerStyle,
  dropdownStyle,
  modalStyle,
  optionStyle,
  optionTextStyle,
  selectedOptionStyle,
  selectedOptionTextStyle,
  disabled,
  renderOption,
}) => {
  const [modalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    if (!disabled) {
      setModalVisible(!modalVisible);
    }
  };

  const selectItem = (item) => {
    onValueChange(item[valueField]);
    setModalVisible(false);
  };

  const renderItem = ({ item }) => {
    const isSelected = item[valueField] === selectedValue;
    if (renderOption) {
      return (
        <TouchableOpacity
          style={[
            styles.option,
            optionStyle,
            isSelected && styles.selectedOption,
            isSelected && selectedOptionStyle,
          ]}
          onPress={() => selectItem(item)}
        >
          {renderOption(item, isSelected)}
        </TouchableOpacity>
      );
    }
    return (
      <TouchableOpacity
        style={[
          styles.option,
          optionStyle,
          isSelected && styles.selectedOption,
          isSelected && selectedOptionStyle,
        ]}
        onPress={() => selectItem(item)}
      >
        <Text
          style={[
            styles.optionText,
            optionTextStyle,
            isSelected && styles.selectedOptionText,
            isSelected && selectedOptionTextStyle,
          ]}
        >
          {item[labelField]}
        </Text>
      </TouchableOpacity>
    );
  };

  const selectedLabel = data.find(
    (item) => item[valueField] === selectedValue
  )?.[labelField];

  return (
    <View style={[styles.container, containerStyle]}>
      <TouchableOpacity
        style={[
          styles.dropdown,
          dropdownStyle,
          disabled && styles.disabledDropdown,
        ]}
        onPress={toggleModal}
        activeOpacity={disabled ? 1 : 0.7}
      >
        <Text
          style={[
            styles.dropdownText,
            !selectedLabel && styles.placeholderText,
          ]}
        >
          {selectedLabel || placeholder || 'Selecciona una opción'}
        </Text>
        {/* <Ionicons
          name={modalVisible ? 'chevron-up' : 'chevron-down'}
          size={20}
          color="#555"
        /> */}
      </TouchableOpacity>

      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={toggleModal}
      >
        <TouchableWithoutFeedback onPress={toggleModal}>
          <View style={styles.modalOverlay} />
        </TouchableWithoutFeedback>
        <View style={[styles.modalContent, modalStyle]}>
          <FlatList
            data={data}
            keyExtractor={(item) => item[valueField].toString()}
            renderItem={renderItem}
            keyboardShouldPersistTaps="handled"
          />
        </View>
      </Modal>
    </View>
  );
};

// Definición de PropTypes para validar los props
CustomDropdown.propTypes = {
  data: PropTypes.array.isRequired,
  selectedValue: PropTypes.any,
  onValueChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  labelField: PropTypes.string,
  valueField: PropTypes.string,
  containerStyle: PropTypes.object,
  dropdownStyle: PropTypes.object,
  modalStyle: PropTypes.object,
  optionStyle: PropTypes.object,
  optionTextStyle: PropTypes.object,
  selectedOptionStyle: PropTypes.object,
  selectedOptionTextStyle: PropTypes.object,
  disabled: PropTypes.bool,
  renderOption: PropTypes.func,
};

// Valores por defecto para los props
CustomDropdown.defaultProps = {
  placeholder: 'Selecciona una opción',
  labelField: 'label',
  valueField: 'value',
  disabled: false,
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  dropdown: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 15,
    borderRadius: 5,
    backgroundColor: '#fff',
  },
  disabledDropdown: {
    backgroundColor: '#f2f2f2',
  },
  dropdownText: {
    fontSize: 16,
    color: '#333',
  },
  placeholderText: {
    color: '#999',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    position: 'absolute',
    top: '30%',
    left: '10%',
    right: '10%',
    backgroundColor: '#fff',
    borderRadius: 10,
    maxHeight: '40%',
    paddingVertical: 10,
    // Añadir sombra para iOS
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    // Añadir elevación para Android
    elevation: 5,
  },
  option: {
    paddingVertical: 15,
    paddingHorizontal: 20,
  },
  selectedOption: {
    backgroundColor: '#f0f0f0',
  },
  optionText: {
    fontSize: 16,
    color: '#333',
  },
  selectedOptionText: {
    fontWeight: 'bold',
    color: '#000',
  },
});

export default CustomDropdown;
