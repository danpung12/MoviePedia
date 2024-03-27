import {useState} from 'react';
import './ReviewForm.css'
import FileInput from './FileInput';

function ReviewForm() {
  
  const [values, setValues] = useState({title:'', rating: 0, content: '', imgFile: null});

  // const [title, setTitle] = useState('');
  // const [rating, setRating] = useState(0);
  // const [content, setContent] = useState('');

  function handleChange(name, value){
    setValues((prevValues)=> ({
      ...prevValues, [name]: value
    }))
  }

  function handleInputChange(e){
    const{name, value} = e.target;
    handleChange(name,value);
 
  }

  // function TitleChange(e){
  //   setTitle(e.target.value);
  // }

  // function RatingChange(e){
  //   setRating(Number(e.target.value));
  // }

  // function ContentChange(e){
  //   setContent(e.target.value);
  // }

  function handleSubmit(e){
    e.preventDefault();
    console.log(values);
  
  }


  return (
    <form className='ReviewForm' onSubmit={handleSubmit}>
      <FileInput/>
      <input name="title" value={values.title} onChange={handleInputChange}/>
      <input name="rating" type="number" value={values.rating} onChange={handleInputChange}/>
      <textarea name="content" value={values.content} onChange={handleInputChange}/>
      <button type="submit">저장</button>
    </form>
    
    );

}

export default ReviewForm;