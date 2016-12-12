import React from 'react';

const Loading = (props) =>{
  let spinnerBgClass = "vh-100 dt w-100 bg-" + props.theme
  let spinnerClass = "dtc v-mid tc ph3 ph4-l" + props.theme
  return(
    <div className={spinnerBgClass}>
      <div className={spinnerClass}>
        <i className="fa fa-spinner fa-spin fa-3x fa-fw"></i>
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  )
}

export default Loading;