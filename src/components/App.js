import ReviewList from "./ReviewList"
import { getReviews } from '../api'
import { useEffect, useState } from "react";

const LIMIT = 6;

function App(){
  const [items, setItems] = useState([]);
  const [order, setOrder] = useState('createdAt');
  const [offset, setOffset] = useState(0);
  const sorted = items.sort((a,b)=> b[order] - a[order]);
  const [hasNext, setHasNext] = useState(false);
  const [isLoading, setisLoading] = useState(false); // 로딩중이면 true
  const [loadError, setLoadError] = useState(null); // 에러가 있으면 error

  
  function BestClick(){
    setOrder('rating');
  }

  function NewClick(){
    setOrder('createdAt');
  }

  function idDelete(id){
    const nextItems = items.filter((it) => it.id !== id);
    setItems(nextItems);
    
  }

  async function handleLoad(options){
    let result;
    try{
      setisLoading(true);
      setLoadError(null);
      result = await getReviews(options);
    } catch (error){
      setLoadError(error);
      return;
    } finally{
      setisLoading(false);
    }


    const {reviews, paging} = result;
    if (options.offset===0){
    setItems(reviews);
    } else {
      setItems((prevItems)=>[...prevItems, ...reviews]);
    }
    setOffset(options.offset+reviews.length);
    setHasNext(paging.hasNext);
  }

  function LoadMore(){
    handleLoad({order, offset, limit:LIMIT});
  }


useEffect(() => {
  handleLoad({order, offset: 0, limit: LIMIT});
}, [order]);
  return(
    <div>
      <div>
        <button onClick ={BestClick}> 베스트순 </button>
        <button onClick ={NewClick}> 최신순 </button>
      </div>
      <ReviewList items={sorted} onDelete={idDelete}/>
      {hasNext && <button disabled={isLoading} onClick={LoadMore}>더 보기</button>}
      {loadError?.message && <span>{loadError.message}</span>}
    </div>
    )
  
}

export default App;