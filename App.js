import { AntDesign, Ionicons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { Modal, Text, TextInput, TouchableOpacity, View } from "react-native";
import { Style } from "./Style";
import { store } from "./Store";
import { add } from "./Slice"; // veya "./dictionarySlice" dosya ismine göre değiştir
import { Provider, useDispatch, useSelector } from "react-redux";

export default function App() {
  const [modal, setModal] = useState(false);

  return (
    <Provider store={store}>
      <View
        style={[
          Style.container,
          { backgroundColor: !modal ? "white" : "rgba(37, 37, 37, 0.4)" },
        ]}
      >
        <StatusBar style="auto" />
        <Word />
        <Create modal={{ modal, setModal }} />
      </View>
    </Provider>
  );
}

const Word = () => {
  const [index, setIndex] = useState(0);
  const dictionary = useSelector((state) => state.dictionary); //state'ye erişebilmek için. Slice namesine dictionary demiştik çünkü

  const move = (where) => {
    if (where === "next") {
      setIndex((prev) => prev + 1)
    }
    else {
      setIndex((prev) => prev - 1)
    }
  };

  return (
    <>
      <Text style={Style.words}>
        {index + 1} <AntDesign name="heart" size={40} color="red" />f
        <Text style={Style.current}>{dictionary.length}</Text>
      </Text>

      <View style={Style.word}>
        <View style={Style.wordSegment}>
          <TouchableOpacity onPress={() => {
            if (index == 0) { //index 0a eşitse daha geri geleme diye return yaptık.
              return;
            }
            move("previous")
          }}>

            <AntDesign name="left" size={30} color="black" />
          </TouchableOpacity>
        </View>
        <View style={[Style.wordSegment, { flex: 3 }]}>
          <Text style={Style.en}> {dictionary[index].en} </Text>
          <Text style={Style.tr}> {dictionary[index].tr} </Text>
        </View>
        <View style={Style.wordSegment}>
          <TouchableOpacity onPress={() => {
            if (index + 1 === dictionary.length) { //index uzunluğa eşitse daha ileri gideme dedik.
              return;
            }
            move("next")
          }}>
            <AntDesign name="right" size={30} color="black" />
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

const Create = (props) => {
  const { setModal } = props.modal;
  return (
    <View style={Style.createButton}>
      <View style={Style.circle}>
        <TouchableOpacity onPress={() => setModal(true)}>
          <Ionicons name="md-add" size={50} color="white" />
        </TouchableOpacity>
      </View>
      <ModalView {...props} />
    </View>
  );
};

const ModalView = (props) => {
  const [en, setEn] = useState("");
  const [tr, setTr] = useState("");
  const dispatch = useDispatch(); //verileri slice içine göndermek için kullanılan fonksiyon.
  const { modal, setModal } = props.modal;
  return (
    <Modal
      transparent
      animationType="slide"
      visible={modal}
      onRequestClose={() => setModal(false)}
    >
      <View style={Style.modal}>
        <TouchableOpacity style={Style.close} onPress={() => setModal(false)}>
          <Text style={Style.cross}>x</Text>
        </TouchableOpacity>

        <TextInput onChangeText={(e)=>setEn(e)} value={en} placeholder="English" style={Style.textBox} />
        <TextInput onChangeText={(e)=>setTr(e)} value={tr} placeholder="Turkish" style={Style.textBox} />

        <TouchableOpacity onPress={()=>{
          const obj = {
            en,
            tr,
          };
          dispatch(add(obj));
          setEn("");
          setTr("");
        }}>
          <View style={Style.button}>
            <AntDesign name="heart" size={20} color="red" />
            <Text style={Style.buttonText}>Save</Text>
          </View>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};
