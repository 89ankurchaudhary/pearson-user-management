import React from "react"

export class Pagination extends React.PureComponent {
    render() {
        const {
            key,
            id,
            handlePagination,
        } = this.props;

        return (
                <button className="btn--pagination" onClick={handlePagination} key={key} id={id}>
                    {id}
                </button>
        );
    }
}
