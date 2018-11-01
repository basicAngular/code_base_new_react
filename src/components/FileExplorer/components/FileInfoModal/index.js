import React from "react";
import PropTypes from "prop-types";
import { observer } from "mobx-react";
import InfoModal from "./Modal";

@observer
export default class FileInfoModal extends React.Component {

    static propTypes = {
        show: PropTypes.bool,
        onHide: PropTypes.func,
        item: PropTypes.oneOfType([
            PropTypes.object,
            PropTypes.array
        ])

    }
    render() {
        const { show, item, onHide } = this.props;

        return (
            <div>
                {show &&
                    <InfoModal
                        show={show}
                        item={item}
                        onHide={onHide}
                    />
                }
            </div>
        );
    }
}