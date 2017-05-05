const COLORS = {
  RED: '#FF0000',
  YELLOW: '#FFCEA5',
  BLACK: '#29363B',
  WHITE: '#FFFFFF',
  VINOUS: '#A50710'
}

const bgBurst = new mojs.Burst({
  left: 0, top: 0,
  count: 3,
  radius: 0,
  degree: 0,
  isShowEnd: false,
  fill: 'rgba(0,0,0,0)',
  children: {
    stroke: [COLORS.RED, COLORS.WHITE, COLORS.BLACK],
    strokeWidth: 40,
    fill: ['rgba(0,0,0,0)'],
    radius: 'stagger(200, 2)',
    scale: { .25: 3 },
    duration: 500,
    delay: 'stagger(50)',
    easing: ['cubic.out', 'cubic.out', 'cubic.out'],
    isForce3d: true,
  }
});

const burst1 = new mojs.Burst({
  left: 0, top: 0,
  count: 5,
  radius: { 50: 250 },
  children: {
    fill: 'white',
    shape: 'line',
    stroke: [COLORS.WHITE, COLORS.VINOUS],
    strokeWidth: 12,
    radius: 'rand(30, 60)',
    radiusY: 0,
    scale: { 1: 0 },
    pathScale: 'rand(.5, 1)',
    degreeShift: 'rand(-360, 360)',
    isForce3d: true,
  }
});

const burst2 = new mojs.Burst({
  top: 0, left: 0,
  count: 3,
  radius: { 0: 250 },
  children: {
    shape: ['circle', 'rect'],
    points: 5,
    fill: [COLORS.WHITE, COLORS.VINOUS],
    radius: 'rand(30, 60)',
    scale: { 1: 0 },
    pathScale: 'rand(.5, 1)',
    isForce3d: true
  }
});

const CIRCLE_OPTS = {
  left: 0, top: 0,
  fill: COLORS.WHITE,
  scale: { .2: 1 },
  opacity: { 1: 0 },
  isForce3d: true,
  isShowEnd: false
}

const circle1 = new mojs.Shape({ ...CIRCLE_OPTS, radius: 200 });
const circle2 = new mojs.Shape({ ...CIRCLE_OPTS, radius: 240, easing: 'cubic.out', delay: 150 });

export default function triggerBlast(x, y) {
  burst1.tune({ x: x, y: y }).generate().replay();
  burst2.tune({ x: x, y: y }).generate().replay();
  circle1.tune({ x: x, y: y }).replay();
  circle2.tune({ x: x, y: y }).replay();
  bgBurst.tune({ x: x, y: y }).replay();
}