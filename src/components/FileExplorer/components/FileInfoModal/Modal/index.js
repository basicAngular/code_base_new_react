import React, { Component } from "react";
import PropTypes from "prop-types";
import { Modal, Button } from "react-bootstrap";
import { FormattedMessage } from "react-intl";
import messages from "./messages";
import moment from "moment";

const InfoModal = ({ show, onHide, item }) => (
    <Modal show={show} bsSize="small" onHide={onHide} style={{ marginLeft: 2 }}>
        <Modal.Header closeButton>
            <Modal.Title><FormattedMessage {...messages.fileDetails} /></Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <h3>{item.name.substring(0, 25)}</h3>
            <div>
                <h4>
                    <FormattedMessage {...messages.added} />
                    {moment(item.created_at).format("D.M.Y")}
                </h4>
                <h4>
                    <FormattedMessage {...messages.size} />
                    {item.size}
                    KB
                        </h4>
                <h4>
                    <FormattedMessage {...messages.author} />
                    {item.author}
                    <br />
                </h4>
                <h4>
                    <FormattedMessage {...messages.tags} />
                    <ul
                        className="tag-list vote-info vote-info1"
                        style={{ padding: 0, lineHeight: "15px" }}
                    ><br />
                        {item.tags.length !== 0 ? (
                            item.tags.map((tag) =>
                                (<li
                                    key={tag}
                                >
                                    <a>{tag}</a>
                                </li>)
                            )
                        ) : (<li>none</li>)}
                    </ul>
                </h4>
                <h4>
                    <FormattedMessage {...messages.dateRelevance} /><br />
                    {item.date_relevance}
                </h4>
            </div>
        </Modal.Body>
        <Modal.Footer>
            <Button onClick={onHide}>
                <FormattedMessage {...messages.hide} />
            </Button>
        </Modal.Footer>
    </Modal>
);

export default InfoModal;

InfoModal.propTypes = {
    show: PropTypes.bool,
    onHide: PropTypes.func,
    item: PropTypes.oneOfType([
        PropTypes.object,
        PropTypes.array
    ])
}
