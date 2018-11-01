import React from "react";
import PropTypes from "prop-types";
import { Col } from "react-bootstrap";
import moment from "moment";
import classNames from "classnames";
import FileInfoModal from '../FileInfoModal';

class ListItemDoc extends React.Component {

  static propTypes = {
    item: PropTypes.object,
    onClick: PropTypes.func,
    setShowInfo: PropTypes.func,
    documentStore: PropTypes.object
  }

  state = {
    document: {},
    showInfo: false
  }

  componentDidMount() {
    const { item } = this.props;
    this.setState({ document: item });
  }

  componentWillReceiveProps(nextProps) {
    const { item } = nextProps;
    this.setState({ document: item });
  }

  toggleFlag(e, flag) {
    e.stopPropagation();
    const { documentStore } = this.props;
    const { document } = this.state;
    document[flag] = !document[flag];
    this.setState({ document }, () => {
      documentStore.update(document);
    });
  }

  closeModal = () => {
    this.setState({ showInfo: false });
  }

  toggleShowInfo(e) {
    e.stopPropagation();
    const { showInfo } = this.state;
    const { setShowInfo } = this.props;
    this.setState({ showInfo: !showInfo }, () => {
      setShowInfo(showInfo);
    });
  }

  render() {
    const { item, onClick } = this.props;
    const { document, showInfo } = this.state;
    return (
      <Col lg={12} className="no-padding-xs" onClick={() => onClick()}>
        <div className="vote-item">
          <div className="row">
            <div className="col-xs-2 file-icon-cell">
              <div className="vote-icon">
                <i className="fa fa-file-pdf-o" />
              </div>
            </div>
            <div className="col-md-5 col-xs-10">
              <a href="#" className="vote-title vote-title1">
                {item.name}
              </a>
            </div>
            <div className="col-md-2 col-xs-12 text-center text-overflow">
              <span className="vote-info vote-info1">{moment(item.created_at).format("D.M.Y")}</span>
            </div>
            <div className="col-md-2 col-xs-12 text-center text-overflow">
              <span className="vote-info vote-info1">{item.size} KB</span>
            </div>
            <div className="col-md-2 col-xs-12">
              <div className="vote-icon vote-icon1">
                <i className={classNames("fa fa-star cursor", { "active": document.is_favorite })} onClick={e => this.toggleFlag(e, "is_favorite")} />
                <i className={classNames("fa fa-ambulance cursor", { "active": document.is_sos })} onClick={e => this.toggleFlag(e, "is_sos")} />
                <i className={classNames("fa fa-building cursor", { "active": document.is_tax_relevant })} onClick={e => this.toggleFlag(e, "is_tax_relevant")} />
              </div>
            </div>
            {showInfo &&
              <FileInfoModal
                item={item}
                show={showInfo}
                onHide={this.closeModal.bind(this)}
              />
            }
            <div className={classNames("file-info-icon", { "col-md-1 text-right": showInfo })}>
              <i
                className={classNames("fa info-icon", { "fa-info-circle": !showInfo }, { "fa-times-circle-o": showInfo })}
                onClick={e => this.toggleShowInfo(e)}
              ></i>
            </div>
          </div>
        </div>
      </Col>
    );
  }
}

export default ListItemDoc;