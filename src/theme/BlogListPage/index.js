/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import BlogLayout from '@theme/BlogLayout';
import BlogPostItem from '@theme/BlogPostItem';
import BlogListPaginator from '@theme/BlogListPaginator';
import { ThemeClassNames } from '@docusaurus/theme-common';
import Tag from '@theme/Tag';
import styles from '../TagsListInline/styles.module.css';
import useGlobalData from '@docusaurus/useGlobalData';

function BlogListPage(props) {
  const { metadata, items, sidebar, tags } = props;
  const {
    siteConfig: { title: siteTitle },
  } = useDocusaurusContext();
  const { blogDescription, blogTitle, permalink } = metadata;
  const isBlogOnlyMode = permalink === '/';
  const title = isBlogOnlyMode ? siteTitle : blogTitle;

  //custom
  const globalData = useGlobalData();
  const pluginData = globalData['custom-blog-plugin-tags']["default"];
  const allTags = pluginData.blogTags;

  //end custom

  return (
    
    <BlogLayout
      title={title}
      description={blogDescription}
      wrapperClassName={ThemeClassNames.wrapper.blogPages}
      pageClassName={ThemeClassNames.page.blogListPage}
      searchMetadatas={{
        // assign unique search tag to exclude this page from search results!
        tag: 'blog_posts_list',
      }}
      sidebar={sidebar}>

      <p className="mb-6 text-2xl font-semibold ">Community Tutorials</p>
      <ul className="mb-12">
        {
          Object.keys(allTags).map((key) => (
            <li key={key} className={styles.tag}>
              <Tag name={allTags[key].name} count={allTags[key].items.length} permalink={allTags[key].permalink} />
            </li>
          ))
        }
      </ul>

      {items.map(({ content: BlogPostContent }) => (
        <BlogPostItem
          key={BlogPostContent.metadata.permalink}
          frontMatter={BlogPostContent.frontMatter}
          assets={BlogPostContent.assets}
          metadata={BlogPostContent.metadata}
          truncated={BlogPostContent.metadata.truncated}>
          {/* <BlogPostContent /> */}
          <p>{BlogPostContent.metadata.description}</p>
        </BlogPostItem>
      ))}
      <BlogListPaginator metadata={metadata} />
    </BlogLayout>
  );
}

export default BlogListPage;
