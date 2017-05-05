import Rx from "rxjs/Rx"
import { getWindowWidth, getWindowHeight } from '../misc/common.js'

class Star extends mojs.CustomShape {
  getShape() {
    return '<path d="M5.51132201,34.7776271 L33.703781,32.8220808 L44.4592855,6.74813038 C45.4370587,4.30369752 47.7185293,3 50,3 C52.2814707,3 54.5629413,4.30369752 55.5407145,6.74813038 L66.296219,32.8220808 L94.488678,34.7776271 C99.7034681,35.1035515 101.984939,41.7850013 97.910884,45.2072073 L75.9109883,63.1330483 L82.5924381,90.3477341 C83.407249,94.4217888 80.4739296,97.6810326 77.0517236,97.6810326 C76.0739505,97.6810326 74.9332151,97.3551083 73.955442,96.7032595 L49.8370378,81.8737002 L26.044558,96.7032595 C25.0667849,97.3551083 23.9260495,97.6810326 22.9482764,97.6810326 C19.3631082,97.6810326 16.2668266,94.4217888 17.4075619,90.3477341 L23.9260495,63.2960105 L2.08911601,45.2072073 C-1.98493875,41.7850013 0.296531918,35.1035515 5.51132201,34.7776271 Z" />';
  }
}
mojs.addShape('star', Star);

const RADIUS = 28;

const burst = () => new mojs.Burst({
  left: 0, top: 0,
  radius: { 6: RADIUS - 3 },
  angle: 45,
  children: {
    shape: 'star',
    radius: RADIUS / 2.2,
    fill: '#FD7932',
    degreeShift: 'stagger(0,-5)',
    duration: 700,
    delay: 200,
    easing: 'quad.out',
    onComplete: function () { this.el.parentNode.removeChild(this.el) }
    // delay:        100,
  }
});

const star = () => new mojs.Shape({
  left: 0, top: 0,
  shape: 'star',
  fill: '#FF9C00',
  scale: { 0: 1 },
  easing: 'elastic.out',
  duration: 1600,
  delay: 300,
  radius: RADIUS / 2.35,
  onComplete: function () { this.el.parentNode.removeChild(this.el) }
});

const showStar = (x, y) => {
  const coords = { x: x, y: y }
  burst().tune(coords).replay()
  star().tune(coords).replay()
}

const checkValidPosition = (starX, starY, baseX, baseY, baseW, baseH) => {
  if (starX < 20 || starX > getWindowWidth() - 20 || starY < 20 || starY > getWindowHeight() - 20)
    return false
  if (Math.abs(starX - baseX) < baseW / 2 + 20 && Math.abs(starY - baseY) < baseH / 2 + 20)
    return false
  return true
}

export default function triggerStar(baseX, baseY, baseW, baseH) {
  Rx.Observable.interval(200).take(8).subscribe(i => {
    let starX
    let starY
    do {
      starX = baseX + 300 * Math.random() - 150
      starY = baseY + 300 * Math.random() - 150
    } while (!checkValidPosition(starX, starY, baseX, baseY, baseW, baseH))
    showStar(starX, starY)
  })
}