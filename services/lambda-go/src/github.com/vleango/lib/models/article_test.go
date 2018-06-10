package models

import (
	"time"
)

func (suite *Suite) TestArticle() {
	article := Article{}
	suite.IsType("testing-2134", article.ID)
	suite.IsType("tha leang", article.Author)
	suite.IsType("my title", article.Title)
	suite.IsType("my body", article.Body)
	suite.IsType([]string{"tag1", "tag2"}, article.Tags)
	suite.IsType(time.Now(), article.CreatedAt)
	suite.IsType(time.Now(), article.UpdatedAt)
}
