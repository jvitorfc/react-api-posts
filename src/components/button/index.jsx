import './styles.css'

export function Button({loadMorePosts, disabled}){
 
  return(
    <button 
    className="button"
    onClick={loadMorePosts}
    disabled={disabled}
    >Load more posts
    </button>
  )
}