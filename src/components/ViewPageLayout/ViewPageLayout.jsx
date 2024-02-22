import React from 'react'
import './styleSheet/ViewPageLayout.css'
import PropTypes from 'prop-types'
import NoData from '../NoData/NoData'
import Paper from '../Paper/Paper'
import PageVerticalLayout from '../PageVerticalLayout/PageVerticalLayout'

function ViewPageLayout({ searchBar, listHeader, actionHeader, cardRender, cardDataList, pagination }) {
  return (
    <PageVerticalLayout>
      {searchBar}

      {listHeader}

      <div className="d-flex" style={{ flexDirection: 'column', rowGap: 18 }}>
        {cardDataList && Array.isArray(cardDataList) && (
          <>
            {cardDataList?.length === 0 ? (
              <Paper>
                <div className="viewPageLayout_nodata">
                  <NoData />
                </div>
              </Paper>
            ) : (
              <div className="d-flex" style={{ flexDirection: 'column', rowGap: 18 }}>
                {actionHeader}
                <div className="viewPageLayout_card_box grayScrollBar">{cardDataList?.map(cardRender)}</div>
              </div>
            )}
          </>
        )}
      </div>

      {pagination}
    </PageVerticalLayout>
  )
}

ViewPageLayout.propTypes = {
  searchBar: PropTypes.node.isRequired,
  listHeader: PropTypes.node.isRequired,
  actionHeader: PropTypes.node.isRequired,
  cardRender: PropTypes.func.isRequired,
  cardDataList: PropTypes.arrayOf(PropTypes.object),
  pagination: PropTypes.node.isRequired,
}

ViewPageLayout.defaultProps = {
  searchBar: <></>,
  listHeader: <></>,
  actionHeader: <></>,
  cardRender: () => <></>,
  cardDataList: null,
  pagination: <></>,
}

export default ViewPageLayout
