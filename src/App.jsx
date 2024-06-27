import { FabricJSCanvas, useFabricJSEditor } from "fabricjs-react"
import { useState } from "react"
import { useEffect } from "react"

function App() {
  const { editor, onReady } = useFabricJSEditor()
  const [images,setImages] = useState([]);
  const onAddCircle = () => {
    editor?.addCircle()
  }
  const onAddRectangle = () => {
    editor?.addRectangle()
  }
  const onDelete = () => {
    editor?.deleteSelected()
  }
  const onDeleteAll = () => {
    editor?.deleteAll()
  }
  const onAddText = () => {
    editor?.addText("hello")
  }
  const addImage = (event)=>{
    const file = event.target.files[0];

    if (!file || !file.type.match(/image.*/)) {
      console.error("Please select an image file.");
      return;
    }

    const reader = new FileReader();
    reader.onload = (evt) => {
      const imageUrl = evt.target.result;
      fabric.Image.fromURL(imageUrl, (oImg) => {
        editor?.canvas.add(oImg);
        setImages([...images, oImg]);
        oImg.scaleToHeight(200); 
        oImg.set({ left: 100, top: 100 }); 
      });
    };
    reader.readAsDataURL(file);
  };
  
  useEffect(() => {

  }, [fabric, editor])

  const setBackgroundImage = (canvas) => {
    console.log(canvas);
    fabric.Image.fromURL('https://st2.depositphotos.com/1035837/8479/i/450/depositphotos_84798240-stock-photo-galaxy-stars-abstract-space-background.jpg', (oImg) => {
      oImg.selectable = false;
      oImg.width =canvas.width;
      oImg.height =canvas.height;
      oImg.sendToBack();
      canvas.add(oImg);
      canvas.sendToBack(oImg);
      canvas.renderAll(); 
    });
  };
  return (
    <div>
      <button onClick={onAddCircle}>Add circle</button>
      <button onClick={onAddRectangle}>Add Rectangle</button>
      <button onClick={onAddText}> Add Text</button>
      <button onClick={onDelete}> Delete</button>
      <button onClick={onDeleteAll}> DeleteAll</button>
      <input type="file" accept="image/*" onChange={addImage} />
      <FabricJSCanvas className="sample-canvas" onReady={setBackgroundImage} />
    </div>
  )
}

export default App
