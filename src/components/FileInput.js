function FileInput(name, value, onChange){


  function handleChange(e){
    const nextValue = e.target.files[0]; //0번은 파일정보
    onChange(name, nextValue);
   
  }

  return(
    
    <input type="file"  onChange={handleChange}/>

  );
}

export default FileInput;