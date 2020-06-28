
function Parity(value) {
    return 0;
}

module.exports.add = function(state, val, cyFlag) {
    // add with eval method as Javascript does not have pointers
    answer = state.a + val + cyFlag;
    state.cc.z = ((answer & 0xff) == 0);
    state.cc.s = ((answer & 0x80) != 0);
    state.cc.cy = (answer > 0xff);
    state.cc.p = Parity(answer & 0xff);
    state.a = answer & 0xff;
    return
}