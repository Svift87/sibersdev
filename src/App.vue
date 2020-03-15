<template>
  <div id="app">
    <div class="container">      
      <div class="header">
        <h1 class="header__title">Книга контактов</h1>
        <!-- <button class="header__added btn" @click="popapAddedShow = !popapAddedShow">Добавить</button> -->
      </div>
      <div class="search">
        <label for="searchInput" class="search__lable">Введите имя </label>
        <input id="searchInput" class="search__input" type="text" v-model="searchName">
      </div>
      <div class="pagination">
        <button type="button" class="btn pagination__btn" v-if="page != 1" @click="page--"> << </button>
        <button type="button" class="btn pagination__btn" v-for="pageNumber in pages.slice(page-1, page+2)" :key="pageNumber.id" @click="page = pageNumber"> {{pageNumber}} </button>
        <button type="button" @click="page++" v-if="page < pages.length" class="btn pagination__btn"> >> </button>
      </div>
      <div class="main">
        <ul class="main__item">
          <div class="sort">
            <button class="btn sort__btn">Сортировка по первой букве</button>
            <button class="btn sort__btn">Сортировка по дате</button>
          </div>
          <li class="main__list" v-for="item in displayedPosts" :key="item.id">
            <div class="main__contaier main__contaier--img">
              <img class="main__img" :src="item.avatar" alt="">
            </div>
            <div class="main__block">
              <div class="main__contaier main__contaier--man">
                <p class="main__info"><span class="bold">Name:</span> {{item.name}}</p>
                <p class="main__info"><span class="bold">Email:</span> {{item.email}}</p>
                <p class="main__info"><span class="bold">Phone:</span> {{item.phone}}</p>
                <p class="main__info"><span class="bold">Website:</span> {{item.website}}</p>
                <p class="main__info"><span class="bold">Company:</span> {{item.company.name}}</p>
              </div>
              <div class="main__contaier main__contaier--adress">
                <p class="main__center"><span class="bold">Address</span> </p>
                <ul class="main__item--adress">
                  <li class="main__list--adress"><span class="bold">State:</span> {{item.address.state}}</li>
                  <li class="main__list--adress"><span class="bold">City:</span> {{item.address.city}}</li>
                  <li class="main__list--adress"><span class="bold">StreetA:</span> {{item.address.streetA}}</li>                   
                  <li class="main__list--adress"><span class="bold">StreetB:</span> {{item.address.streetB}}</li>                   
                  <li class="main__list--adress"><span class="bold">StreetC:</span> {{item.address.streetC}}</li>                   
                  <li class="main__list--adress"><span class="bold">StreetD:</span> {{item.address.streetD}}</li>                   
                </ul>
              </div>
            </div>
            <button class="main__detail btn" @click="popapDetail(item)">Подробнее</button>
          </li>          
        </ul>
      </div>
      <div class="pagination">
        <button type="button" class="btn pagination__btn" v-if="page != 1" @click="page--"> << </button>
        <button type="button" class="btn pagination__btn" v-for="pageNumber in pages.slice(page-1, page+2)" :key="pageNumber.id" @click="page = pageNumber"> {{pageNumber}} </button>
        <button type="button" @click="page++" v-if="page < pages.length" class="btn pagination__btn"> >> </button>
      </div>
    </div>

    <!-- <div class="popap added" v-if="popapAddedShow">
      <div class="background" @click="popapAddedShow = !popapAddedShow"></div>
      <div class="added__container">
        <div class="cloused" @click="popapAddedShow = !popapAddedShow">X</div>
        <form class="added__content">
          <h2 class="added__header">
            Добавить контакт
          </h2>          
          <div class="added__block">
            <div class="added__block--input">
              <label for="popapAdded_1" class="added__label">Имя</label>
              <input type="text" id="popapAdded_1" class="added__input" required>
            </div>
            <div class="added__block--input">
              <label for="popapAdded_2" class="added__label">Email</label>
              <input type="text" id="popapAdded_2" class="added__input" required>
            </div>
            <div class="added__block--input">
              <label for="popapAdded_3" class="added__label">Телефон</label>
              <input type="text" id="popapAdded_3" class="added__input" required>
            </div>
            <div class="added__block--input">
              <label for="popapAdded_4" class="added__label">Web-сайт</label>
              <input type="text" id="popapAdded_4" class="added__input" required>
            </div>
            <div class="added__block--input">
              <label for="popapAdded_5" class="added__label">Компания</label>
              <input type="text" id="popapAdded_5" class="added__input" required>
            </div>
            <div class="added__block--input">
              <label for="popapAdded_6" class="added__label">Область/Штат</label>
              <input type="text" id="popapAdded_6" class="added__input" required>
            </div>
            <div class="added__block--input">
              <label for="popapAdded_7" class="added__label">Город</label>
              <input type="text" id="popapAdded_7" class="added__input" required>
            </div>
            <div class="added__block--input">
              <label for="popapAdded_8" class="added__label">Улица</label>
              <input type="text" id="popapAdded_8" class="added__input" required>
            </div>
          </div>
          <input type="submit" class="btn" @click.prevent="submitAded">
        </form>
      </div>
    </div> -->

    <div class="popap detail" v-if="popapDetailShow">
      <div class="background" @click="popapDetailShow = !popapDetailShow"></div>
      <div class="detail__container">
        <div class="cloused" @click="popapDetailShow = !popapDetailShow">X</div>
        <form class="detail__content" @submit.prevent="submitDetail">
          <h2 class="detail__header">
            Добавить контакт
          </h2>          
          <div class="detail__block">
            <div class="detail__block--input">
              <label for="popapAdded_1" class="detail__label">Name</label>
              <input type="text" v-model="popapDetailArr.name" id="popapAdded_1" class="detail__input" value="popapDetailArr.name">
            </div>
            <div class="detail__block--input">
              <label for="popapAdded_2" class="detail__label">Email</label>
              <input type="text" v-model="popapDetailArr.email" id="popapAdded_2" class="detail__input" value="popapDetailArr.email">
            </div>
            <div class="detail__block--input">
              <label for="popapAdded_3" class="detail__label">Phone</label>
              <input type="text" v-model="popapDetailArr.phone" id="popapAdded_3" class="detail__input" value="popapDetailArr.phone">
            </div>
            <div class="detail__block--input">
              <label for="popapAdded_4" class="detail__label">Website</label>
              <input type="text" v-model="popapDetailArr.website" id="popapAdded_4" class="detail__input" value="popapDetailArr.website">
            </div>
            <div class="detail__block--input">
              <label for="popapAdded_5" class="detail__label">Company</label>
              <input type="text" v-model="popapDetailArr.company.name" id="popapAdded_5" class="detail__input" value="popapDetailArr.company.name">
            </div>
            <div class="detail__block--input">
              <label for="popapAdded_6" class="detail__label">State</label>
              <input type="text" v-model="popapDetailArr.address.state" id="popapAdded_6" class="detail__input" value="popapDetailArr.address.state">
            </div>
            <div class="detail__block--input">
              <label for="popapAdded_7" class="detail__label">City</label>
              <input type="text" v-model="popapDetailArr.address.city" id="popapAdded_7" class="detail__input" value="popapDetailArr.address.city">
            </div>
            <div class="detail__block--input">
              <label for="popapAdded_8" class="detail__label">StreetA</label>
              <input type="text" v-model="popapDetailArr.address.streetA" id="popapAdded_8" class="detail__input" value="popapDetailArr.address.streetA">
            </div>
            <div class="detail__block--input">
              <label for="popapAdded_9" class="detail__label">StreetB</label>
              <input type="text" v-model="popapDetailArr.address.streetB" id="popapAdded_9" class="detail__input" value="popapDetailArr.address.streetB">
            </div>
            <div class="detail__block--input">
              <label for="popapAdded_10" class="detail__label">StreetC</label>
              <input type="text" v-model="popapDetailArr.address.streetC" id="popapAdded_10" class="detail__input" value="popapDetailArr.address.streetC">
            </div>
            <div class="detail__block--input">
              <label for="popapAdded_11" class="detail__label">StreetD</label>
              <input type="text" v-model="popapDetailArr.address.streetD" id="popapAdded_11" class="detail__input" value="popapDetailArr.address.streetD">
            </div>
          </div>
          <input type="submit" class="btn" value="Сохранить">
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      posts: [],
      active: 0,
      baseUrl: 'http://demo.sibers.com/users',
      page: 1,
      perPage: 10,
      pages: [],
      searchName: '',
      // popapAddedShow: false,
      popapDetailShow: false,
      popapDetailArr: []
    }     
  },
  methods: {
    getPosts () {
      this.$http.get(this.baseUrl)
        .then(response => {
          this.posts = response.data;
        })
        .catch(response => {
          console.log(response);
      });
    },
    setPages () {
      let numberOfPages = Math.ceil(this.posts.length / this.perPage);
      for (let index = 1; index <= numberOfPages; index++) {
        this.pages.push(index);
      }
    },
    paginate (posts) {
      let page = this.page;
      let perPage = this.perPage;
      let from = (page * perPage) - perPage;
      let to = (page * perPage);
      return  posts.slice(from, to);
    },
    submitAded () {

    },
    popapDetail (elem) {
      this.popapDetailArr = elem,
      this.popapDetailShow = true
    },
    submitDetail () {
      this.posts[this.active] = { ...this.posts[this.active], ...this.popapDetailArr };
      this.popapDetailShow = false
    }
  },
  created () {
    this.getPosts();
  },
  watch: {
    posts () {
      this.setPages();
    }
  },
  computed: {
    displayedPosts () {
      return this.paginate(this.posts);
    }
  },
}
</script>
