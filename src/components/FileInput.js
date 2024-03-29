import { useState, useRef, useEffect} from "react";

function FileInput({name, value, onChange}){

  const [preview, setPreview]= useState();

  const inputRef = useRef();

  function handleChange(e){
    const nextValue = e.target.files[0]; //0번은 파일정보
    onChange(name, nextValue);
   
  }


  function handleClear(){
    const inputNode = inputRef.current;
    if (!inputNode) return;

    inputNode.value='';
    onChange(name,null);

  }

  useEffect(()=> {
    if (!value) return; //파일 값이 없으면 종료.

    //createObjectURL은 () 안의 파일을 주소 값으로 표시해줌.
    const nextPreview=URL.createObjectURL(value);
    setPreview(nextPreview);

    //useEffect가 [value]값이 변경되어 재랜더링 할때 return
    //함수가 있으면, 이 값을 실행함. 즉 nextPreview값을 초기화
    return () => {
      setPreview();
      URL.revokeObjectURL(nextPreview);
    }
  }, [value]) // 파일 선택값이 바뀔 때마다 재랜더링.

  

  return(
    <div>
    <img src={preview}/>
      <input type="file" accept="image/png, image.jpeg" onChange={handleChange} ref={inputRef}/>
      {value&& <button onClick={handleClear}>X</button>}
    </div>
  );
}

export default FileInput;