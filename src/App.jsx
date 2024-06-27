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
  const onSetColor = () => {
    editor?.setFillColor("#8ecae6")
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

  const exportToPNG = () => {
    const canvasData = editor?.canvas.toDataURL({ format: 'png' }); // Get canvas data as PNG
    const link = document.createElement('a');
    link.href = canvasData;
    link.download = 'my_design.png'; // Set desired filename
    link.click();
  };
  
  useEffect(() => {
    fabric.Image.fromURL('/vite.svg', (oImg) => {
      oImg.selectable = false;
      oImg.width =editor?.canvas.width;
      oImg.height =editor?.canvas.height;
      oImg.sendToBack();
      editor?.canvas.add(oImg);
      editor?.canvas.sendToBack(oImg);
      editor?.canvas.renderAll(); 
    });
  }, [fabric, editor])


  return (
    <div>
      <button onClick={onAddCircle}>Add circle</button>
      <button onClick={onAddRectangle}>Add Rectangle</button>
      <button onClick={onAddText}> Add Text</button>
      <button onClick={onDelete}> Delete</button>
      <button onClick={onDeleteAll}> DeleteAll</button>
      <button onClick={onSetColor}> Color</button>
      <input type="file" accept="image/*" onChange={addImage} />
      <button onClick={exportToPNG}>Export as PNG</button>
      <h1 className="text-3xl font-bold underline">
    Hello world!
  </h1>
      <FabricJSCanvas className="sample-canvas" onReady={onReady} />
    </div>
  )
}

export default App
