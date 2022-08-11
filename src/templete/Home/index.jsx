import { Component } from 'react';

import { loadPosts } from '../../utils/load-posts'

import { Posts } from '../../components/Posts';
import { Button } from '../../components/Button';

import './styles.css';
import { TextInput } from '../../components/TextInput';

class Home extends Component {
  state = {
    posts: [],
    allPosts: [], 
    page: 0,
    postPerPage: 1,
    searchValue: ''
  };

  async componentDidMount() {
    await this.loadPosts()
  }


  loadPosts = async () =>{
    const {page, postPerPage} = this.state
    const postsAndPhotos = await loadPosts()
    this.setState({
      posts: postsAndPhotos.slice(page, postPerPage),
      allPosts: postsAndPhotos
    })
  }

  loadMorePosts = () =>{
    const {
      page,
      postPerPage,
      allPosts, 
      posts
    } = this.state

    const nextPage = page + postPerPage
    const nextPosts = allPosts.slice(nextPage, nextPage + postPerPage)
    posts.push(...nextPosts);
    this.setState({posts, page: nextPage})
  }

  handleChange = (event) => {
    const {value} = event.target
    this.setState({searchValue: value})
  }

  render() {
    const { posts, postPerPage, page, allPosts, searchValue } = this.state;
    const noMorePosts = page + postPerPage >= allPosts.length
    const filteredPosts = !!searchValue ? 
    allPosts.filter(post =>{
      console.log(post.title.toLowerCase())
      return post.title.toLowerCase().includes(searchValue.toLowerCase());
    }) 
    : posts
    return (
      <section className="container">

        <div className="search-container">
          { searchValue && <h1>Search value: {searchValue}</h1>}
          <TextInput searchValue={searchValue} handleChange={this.handleChange}/>
        </div>
        

          {filteredPosts.length > 0 && (
            <Posts posts={filteredPosts} /> 
          )}

          {filteredPosts.length === 0 && (
            <p>Não existem posts</p>
          )}
        
          <div className="button-container">
            { !searchValue && (
              <Button 
                disabled={noMorePosts}
                text="Carregar dados"
                onClick = {this.loadMorePosts} 
              />
            )}
          </div>
      </section>
    );
  }
}
export default Home;