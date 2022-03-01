import { Component } from 'react';

import './styles.css';

import { Posts } from '../../components/Posts';
import { loadPosts } from '../../utils/load-posts';
import { Button } from '../../components/button';
import { TextInput } from '../../components/TextInput';

class Home extends Component {
  state = {
    posts: [],
    allPosts: [],
    page: 0,
    postsPorPage: 2,
    searchValue: ''
  };

  async componentDidMount() {
    // executa uma vez quando o component é montado
    await this.loadPosts();
  }

  loadPosts = async () => {
    const {page, postsPorPage} = this.state
    const postsAndPhotos = await loadPosts();
    this.setState({ 
      posts: postsAndPhotos.slice(page, postsPorPage),
      allPosts: postsAndPhotos 
    });
  };

  loadMorePosts = async () => {
    const {page, postsPorPage, allPosts, posts} = this.state
    const nextPage = page + postsPorPage;
    const nextPosts = allPosts.slice(nextPage, nextPage + postsPorPage)
    posts.push(...nextPosts)
    this.setState({ posts, page: nextPage})
  }

  handleChange = (e) => {

    const {value} = e.target
    this.setState({searchValue: value})

  }



  render() {
    const { posts, page, postsPorPage, allPosts, searchValue } = this.state;
    const noMorePosts = page + postsPorPage >= allPosts.length;

    const filteredPosts = searchValue ? 
    allPosts.filter(post => {
      return post.title.toLowerCase().includes(searchValue.toLowerCase())
      
    }) 
    : posts;

    

    return (
      <section className="container">
        <div className="search-container">
          {searchValue && (
            <h1>{searchValue}</h1>
          )}

          <TextInput
          handleChange={this.handleChange}
          searchValue={searchValue}
          />
        </div>
       

        {filteredPosts.length > 0 &&(
          <Posts posts={filteredPosts} />
        )}  
        {filteredPosts.length === 0 &&(
          <p>Não existem Posts com esse assunto =(</p>
        )}

        <div className="button-container">
        {!searchValue && (
           <Button 
           loadMorePosts={this.loadMorePosts}
           disabled={noMorePosts}
           postsPorPage={postsPorPage}
           />
        )}
       
        </div>
      </section>
    );
  }
}

export default Home;
