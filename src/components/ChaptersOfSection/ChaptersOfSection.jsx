import React from 'react'
import ContentFrame from '../ContentFrame/ContentFrame'
import ChapterList from '../ChapterList/ChapterList'
import Divider from '../Divider/Divider'

function ChaptersOfSection({ onClickFillData, chaptersInfo, sectionTitle }) {
  return (
    <ContentFrame title={sectionTitle || ''}>
      {chaptersInfo.map((documentItem, documentIndex) => {
        const { infoTitleTh, successDescriptionTh, chapters } = documentItem

        return (
          <>
            <ChapterList
              title={infoTitleTh}
              successDescription={successDescriptionTh}
              chapterList={chapters}
              onClickFillData={(chapterSeq) => onClickFillData(chapterSeq)}
            />
            {documentIndex < chaptersInfo.length - 1 && <Divider type={'dashed'} />}
          </>
        )
      })}
    </ContentFrame>
  )
}

export default ChaptersOfSection
