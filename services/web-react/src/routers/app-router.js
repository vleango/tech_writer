import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';

import ArticleListPage from '../components/articles/ArticleListPage';
import ArticleItemPage from '../components/articles/ArticleItemPage';
import ArticleEditPage from '../components/articles/ArticleEditPage';
import NotFoundPage from '../components/shared/errors/NotFoundPage';

export const history = createHistory();

export const AppRouter = () => (
  <Router history={history}>
    <div>
      <Switch>
        <Route path="/" component={ArticleListPage} exact={true} />
        <Route path="/articles/edit/:id" component={ArticleEditPage} />
        <Route path="/articles/:id" component={ArticleItemPage} />
        <Route component={NotFoundPage} />
      </Switch>
    </div>
  </Router>
);

export default AppRouter;