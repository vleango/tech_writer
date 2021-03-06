import axios from 'axios';
import { ROOT_API_URL } from '../Base';
import { fetchList, fetchArchiveArticlesList, createItem, fetchItem, updateItem, removeItem, itemEditable } from '../articles';

// thunk methods
let dispatch, getState;
let defaultHeader = {"headers": {"Authorization": "Bearer "}};

describe('Actions', () => {
    describe('Articles', () => {
        beforeEach(() => {
            dispatch = jest.fn();
            getState = jest.fn();
        });

        describe('fetchList', () => {
            beforeEach(() => {
                axios.get = jest.fn((url) => Promise.resolve({ data: { articles: 'hi'} }));
            });

            it('should call GET /articles', async () => {
                await fetchList()(dispatch, getState);
                expect(axios.get).toHaveBeenLastCalledWith(`${ROOT_API_URL}/articles`);
                expect(dispatch.mock.calls[0][0]).toEqual({
                    type: 'ARTICLE_LIST',
                    data: {articles: 'hi', selected: {}},
                });
            });

            describe('contains tag', () => {
                it('should call GET /articles?tag={tag}', async () => {
                    await fetchList({tag: "rails"})(dispatch, getState);
                    expect(axios.get).toHaveBeenLastCalledWith(`${ROOT_API_URL}/articles?tag=rails`);
                    expect(dispatch.mock.calls[0][0]).toEqual({
                        type: 'ARTICLE_LIST',
                        data: {articles: 'hi', selected: {"tag": "rails"}},
                    });
                });
            });

            describe('contains date', () => {
                it('should call GET /articles?tag={date}', async () => {
                    await fetchList({date: "2018-01-01"})(dispatch, getState);
                    expect(axios.get).toHaveBeenLastCalledWith(`${ROOT_API_URL}/articles?date=2018-01-01`);
                    expect(dispatch.mock.calls[0][0]).toEqual({
                        type: 'ARTICLE_LIST',
                        data: {articles: 'hi', selected: {"date": "2018-01-01"}},
                    });
                });
            });

            describe('contains match', () => {
                it('should call GET /articles?tag={match}', async () => {
                    await fetchList({match: "web"})(dispatch, getState);
                    expect(axios.get).toHaveBeenLastCalledWith(`${ROOT_API_URL}/articles?match=web`);
                    expect(dispatch.mock.calls[0][0]).toEqual({
                        type: 'ARTICLE_LIST',
                        data: {articles: 'hi', selected: {"match": "web"}},
                    });
                });
            });

        });

        describe('fetchArticlesArchiveList', () => {
            beforeEach(() => {
                axios.get = jest.fn((url) => Promise.resolve({data: {articles: 'hi'}}));
            });

            it('should call GET /articles/archives', async () => {
                await fetchArchiveArticlesList()(dispatch, getState);
                expect(axios.get).toHaveBeenLastCalledWith(`${ROOT_API_URL}/archives/articles`);
                expect(dispatch.mock.calls[0][0]).toEqual({
                    type: 'ARCHIVE_ARTICLES_LIST',
                    data: {articles: 'hi'},
                });
            });
        });

        describe('createItem', () => {
            beforeEach(() => {
                axios.post = jest.fn((url) => Promise.resolve({ data: { articles: 'hi'} }));
            });

            it('should call POST /articles', async () => {
                await createItem({someData: true})(dispatch, getState);
                expect(axios.post).toHaveBeenLastCalledWith(`${ROOT_API_URL}/articles`, {someData: true}, defaultHeader);
            });
        });

        describe('fetchItem', () => {
            beforeEach(() => {
                axios.get = jest.fn((url) => Promise.resolve({ data: { article: 'art1'} }));
            });

            it('should call GET /articles/:id', async () => {
                const id = 6;
                await fetchItem(id)(dispatch, getState);
                expect(axios.get).toHaveBeenLastCalledWith(`${ROOT_API_URL}/articles/${id}`);
                expect(dispatch.mock.calls[0][0]).toEqual({
                    type: 'ARTICLE_ITEM',
                    data: {article: {article: 'art1'}}
                });
            });
        });

        describe('updateItem', () => {
            beforeEach(() => {
                axios.post = jest.fn((url) => Promise.resolve({ data: { article: 'art1'} }));
            });

            it('should call POST /articles/:id', async () => {
                const data = {id: 6};
                await updateItem(data)(dispatch, getState);
                expect(axios.post).toHaveBeenLastCalledWith(`${ROOT_API_URL}/articles/${data.id}`, {}, defaultHeader);
            });
        });

        describe('removeItem', () => {
            beforeEach(() => {
                axios.delete = jest.fn((url) => Promise.resolve({ data: { article: 'art1'} }));
            });

            it('should call DELETE /articles/:id', async () => {
                const data = {id: 6};
                await removeItem(data)(dispatch, getState);
                expect(axios.delete).toHaveBeenLastCalledWith(`${ROOT_API_URL}/articles/${data.id}`, defaultHeader);
            });
        });

        describe('itemEditable', () => {
            beforeEach(() => {
                axios.get = jest.fn((url) => Promise.resolve({ data: { article: 'art1'} }));
            });

            it('should call GET /users_articles/verify/:id', async () => {
                const id = 6;
                await itemEditable(id)(dispatch, getState);
                expect(axios.get).toHaveBeenLastCalledWith(`${ROOT_API_URL}/users_articles/verify/${id}`, defaultHeader);
            });
        });

    });
});
