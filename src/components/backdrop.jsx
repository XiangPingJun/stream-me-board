import React from 'react'

export default class Backdrop extends React.Component {
  render = () => (
    <div style={{
      position: 'fixed', left: 0, top: 0, width: '100vw', height: '100vh',
      backgroundColor: 'rgba(29,157,116,0.85)',
      animationDuration: '.5s',
    }} className='animated fadeIn' />
  )
}