/*
Opcodes refers from:
http://www.emulator101.com/reference/8080-by-opcode.html
https://pastraiser.com/cpu/i8080/i8080_opcodes.html
*/
var fs = require('fs');
var instructions_funcs = require('./8080_instructions');

function toBytesInt8(num) {
    arr = new ArrayBuffer(1);
    view = new DataView(arr);
    view.setInt8(0, num, false); // byteOffset = 0; litteEndian = false
    return arr;
}

function loadCode() {
    var file = fs.readFileSync('./roms/8080/test_case.h')
    var buffer = Buffer.from(file);
    return buffer;
}

function Parity(value) {
    return 0;
}

function update(state) {
    //console.log();
    var code = state.memory[state.pc];
    var opcodeName;
    // Super-long opcode switch cases
    switch (code) {
        case 0x00:
            // Opcode = NOP; Size = 1
            opcodeName = 'NOP';
            opcodeBytes = 1;
            break;
        case 0x01:
        case 0x11:
        case 0x21:
        case 0x31:
            // Opcode = LXI; Size = 3
            opcodeName = 'LXI';
            opcodeBytes = 3;
            dst = state.memory[state.pc + 1];
            src = state.memory[state.pc + 2];
            break;
        case 0x02:
        case 0x12:
            // Opcode = STAX; Size = 1
            opcodeName = 'STAX';
            opcodeBytes = 1;
            break;
        case 0x03:
        case 0x13:
        case 0x23:
        case 0x33:
            // Opcode = INX; Size = 1
            opcodeName = 'INX';
            opcodeBytes = 1;
            break;
        case 0x04:
        case 0x0c:
        case 0x14:
        case 0x1c:
        case 0x24:
        case 0x2c:
        case 0x34:
        case 0x3c:
            // Opcode = INR; Size = 1
            opcodeName = 'INR';
            opcodeBytes = 1;
            break;
        case 0x05:
        case 0x0d:
        case 0x15:
        case 0x1d:
        case 0x25:
        case 0x2d:
        case 0x35:
        case 0x3d:
            // Opcode = DCR; Size = 1
            opcodeName = 'DCR';
            opcodeBytes = 1;
            break;
        case 0x06:
        case 0x0e:
        case 0x16:
        case 0x1e:
        case 0x26:
        case 0x2e:
        case 0x36:
        case 0x3e:
            // Opcode = MVI; Size = 2
            opcodeName = 'MVI';
            opcodeBytes = 2;
            src = state.memory[state.pc + 1];
            break;
        case 0x07:
            // Opcode = RLC; Size = 1
            opcodeName = 'RLC';
            opcodeBytes = 1;
            break;
        case 0x08:
        case 0x10:
        case 0x18:
        case 0x20:
        case 0x28:
        case 0x30:
        case 0x38:
        case 0xcb:
        case 0xd9:
        case 0xdd:
        case 0xed:
        case 0xfd:
            // Opcode = -; Size = NaN
            opcodeName = '-';
            opcodeBytes = NaN;
            break;
        case 0x09:
        case 0x19:
        case 0x29:
        case 0x39:
            // Opcode = DAD; Size = 1
            opcodeName = 'DAD';
            opcodeBytes = 1;
            break;
        case 0x0a:
        case 0x1a:
            // Opcode = LDAX; Size = 1
            opcodeName = 'LDAX';
            opcodeBytes = 1;
            break;
        case 0x0b:
        case 0x1b:
        case 0x2b:
        case 0x3b:
            // Opcode = DCX; Size = 1
            opcodeName = 'DCX';
            opcodeBytes = 1;
            break;
        case 0x0f:
            // Opcode = RRC; Size = 1
            opcodeName = 'RRC';
            opcodeBytes = 1;
            break;
        case 0x17:
            // Opcode = RAL; Size = 1
            opcodeName = 'RAL';
            opcodeBytes = 1;
            break;
        case 0x1f:
            // Opcode = RAR; Size = 1
            opcodeName = 'RAR';
            opcodeBytes = 1;
            break;
        case 0x22:
            // Opcode = SHLD; Size = 3
            opcodeName = 'SHLD';
            opcodeBytes = 3;
            dst = state.memory[state.pc + 1];
            src = state.memory[state.pc + 2];
            break;
        case 0x27:
            // Opcode = DAA; Size = 1
            opcodeName = 'DAA';
            opcodeBytes = 1;
            break;
        case 0x2a:
            // Opcode = LHLD; Size = 3
            opcodeName = 'LHLD';
            opcodeBytes = 3;
            dst = state.memory[state.pc + 1];
            src = state.memory[state.pc + 2];
            break;
        case 0x2f:
            // Opcode = CMA; Size = 1
            opcodeName = 'CMA';
            opcodeBytes = 1;
            break;
        case 0x32:
            // Opcode = STA; Size = 3
            opcodeName = 'STA';
            opcodeBytes = 3;
            dst = state.memory[state.pc + 1];
            src = state.memory[state.pc + 2];
            break;
        case 0x37:
            // Opcode = STC; Size = 1
            opcodeName = 'STC';
            opcodeBytes = 1;
            break;
        case 0x3a:
            // Opcode = LDA; Size = 3
            opcodeName = 'LDA';
            opcodeBytes = 3;
            dst = state.memory[state.pc + 1];
            src = state.memory[state.pc + 2];
            break;
        case 0x3f:
            // Opcode = CMC; Size = 1
            opcodeName = 'CMC';
            opcodeBytes = 1;
            break;
        case 0x40:
        case 0x41:
        case 0x42:
        case 0x43:
        case 0x44:
        case 0x45:
        case 0x46:
        case 0x47:
        case 0x48:
        case 0x49:
        case 0x4a:
        case 0x4b:
        case 0x4c:
        case 0x4d:
        case 0x4e:
        case 0x4f:
        case 0x50:
        case 0x51:
        case 0x52:
        case 0x53:
        case 0x54:
        case 0x55:
        case 0x56:
        case 0x57:
        case 0x58:
        case 0x59:
        case 0x5a:
        case 0x5b:
        case 0x5c:
        case 0x5d:
        case 0x5e:
        case 0x5f:
        case 0x60:
        case 0x61:
        case 0x62:
        case 0x63:
        case 0x64:
        case 0x65:
        case 0x66:
        case 0x67:
        case 0x68:
        case 0x69:
        case 0x6a:
        case 0x6b:
        case 0x6c:
        case 0x6d:
        case 0x6e:
        case 0x6f:
        case 0x70:
        case 0x71:
        case 0x72:
        case 0x73:
        case 0x74:
        case 0x75:
        case 0x77:
        case 0x78:
        case 0x79:
        case 0x7a:
        case 0x7b:
        case 0x7c:
        case 0x7d:
        case 0x7e:
        case 0x7f:
            // Opcode = MOV; Size = 1
            opcodeName = 'MOV';
            opcodeBytes = 1;
            break;
        case 0x76:
            // Opcode = HLT; Size = 1
            opcodeName = 'HLT';
            opcodeBytes = 1;
            break;
        case 0x80:
        case 0x81:
        case 0x82:
        case 0x83:
        case 0x84:
        case 0x85:
        case 0x86:
        case 0x87:
            // Opcode = ADD; Size = 1
            opcodeName = 'ADD';
            opcodeBytes = 1;

            // Register-map for the group of opcodes
            var regMap = ['b', 'c', 'd', 'e', 'h', 'l', 'm', 'a']
            var mappedSrcIdx = (code & 0x0F);
            src = eval("state." + regMap[mappedSrcIdx]);
            
            if(regMap[mappedSrcIdx] == 'm') {
                // Memory form
                var offset = (state.h << 8) | (state.l);    // Thus the address is accessed via HHHHHHHHLLLLLLLL <- 16-bit
                var val = state.memory[offset];
            } else {
                // Register form
                var val = src;
            }
            instructions_funcs.add(state, val, 0);
            console.log(state);
            console.log(state);
            break;
        case 0x88:
        case 0x89:
        case 0x8a:
        case 0x8b:
        case 0x8c:
        case 0x8d:
        case 0x8e:
        case 0x8f:
            // Opcode = ADC; Size = 1
            opcodeName = 'ADC';
            opcodeBytes = 1;

            // Register-map for the group of opcodes
            var regMap = ['b', 'c', 'd', 'e', 'h', 'l', 'm', 'a']
            var mappedSrcIdx = (code & 0x0F);
            src = eval("state." + regMap[mappedSrcIdx]);
            
            if(regMap[mappedSrcIdx] == 'm') {
                // Memory form
                var offset = (state.h << 8) | (state.l);    // Thus the address is accessed via HHHHHHHHLLLLLLLL <- 16-bit
                var val = state.memory[offset];
            } else {
                // Register form
                var val = src;
            }
            instructions_funcs.add(state, val, state.cc.cy);
            console.log(state);
            break;
        case 0x90:
        case 0x91:
        case 0x92:
        case 0x93:
        case 0x94:
        case 0x95:
        case 0x96:
        case 0x97:
            // Opcode = SUB; Size = 1
            opcodeName = 'SUB';
            opcodeBytes = 1;
            break;
        case 0x98:
        case 0x99:
        case 0x9a:
        case 0x9b:
        case 0x9c:
        case 0x9d:
        case 0x9e:
        case 0x9f:
            // Opcode = SBB; Size = 1
            opcodeName = 'SBB';
            opcodeBytes = 1;
            break;
        case 0xa0:
        case 0xa1:
        case 0xa2:
        case 0xa3:
        case 0xa4:
        case 0xa5:
        case 0xa6:
        case 0xa7:
            // Opcode = ANA; Size = 1
            opcodeName = 'ANA';
            opcodeBytes = 1;
            break;
        case 0xa8:
        case 0xa9:
        case 0xaa:
        case 0xab:
        case 0xac:
        case 0xad:
        case 0xae:
        case 0xaf:
            // Opcode = XRA; Size = 1
            opcodeName = 'XRA';
            opcodeBytes = 1;
            break;
        case 0xb0:
        case 0xb1:
        case 0xb2:
        case 0xb3:
        case 0xb4:
        case 0xb5:
        case 0xb6:
        case 0xb7:
            // Opcode = ORA; Size = 1
            opcodeName = 'ORA';
            opcodeBytes = 1;
            break;
        case 0xb8:
        case 0xb9:
        case 0xba:
        case 0xbb:
        case 0xbc:
        case 0xbd:
        case 0xbe:
        case 0xbf:
            // Opcode = CMP; Size = 1
            opcodeName = 'CMP';
            opcodeBytes = 1;
            break;
        case 0xc0:
            // Opcode = RNZ; Size = 1
            opcodeName = 'RNZ';
            opcodeBytes = 1;
            break;
        case 0xc1:
        case 0xd1:
        case 0xe1:
        case 0xf1:
            // Opcode = POP; Size = 1
            opcodeName = 'POP';
            opcodeBytes = 1;
            break;
        case 0xc2:
            // Opcode = JNZ; Size = 3
            opcodeName = 'JNZ';
            opcodeBytes = 3;
            dst = state.memory[state.pc + 1];
            src = state.memory[state.pc + 2];
            break;
        case 0xc3:
            // Opcode = JMP; Size = 3
            opcodeName = 'JMP';
            opcodeBytes = 3;
            dst = state.memory[state.pc + 1];
            src = state.memory[state.pc + 2];
            break;
        case 0xc4:
            // Opcode = CNZ; Size = 3
            opcodeName = 'CNZ';
            opcodeBytes = 3;
            dst = state.memory[state.pc + 1];
            src = state.memory[state.pc + 2];
            break;
        case 0xc5:
        case 0xd5:
        case 0xe5:
        case 0xf5:
            // Opcode = PUSH; Size = 1
            opcodeName = 'PUSH';
            opcodeBytes = 1;
            break;
        case 0xc6:
            // Opcode = ADI; Size = 2
            opcodeName = 'ADI';
            opcodeBytes = 2;

            src = state.memory[state.pc + 1];
            instructions_funcs.add(state, src, 0);
            console.log(state);
            break;
        case 0xc7:
        case 0xcf:
        case 0xd7:
        case 0xdf:
        case 0xe7:
        case 0xef:
        case 0xf7:
        case 0xff:
            // Opcode = RST; Size = 1
            opcodeName = 'RST';
            opcodeBytes = 1;
            break;
        case 0xc8:
            // Opcode = RZ; Size = 1
            opcodeName = 'RZ';
            opcodeBytes = 1;
            break;
        case 0xc9:
            // Opcode = RET; Size = 1
            opcodeName = 'RET';
            opcodeBytes = 1;
            break;
        case 0xca:
            // Opcode = JZ; Size = 3
            opcodeName = 'JZ';
            opcodeBytes = 3;
            dst = state.memory[state.pc + 1];
            src = state.memory[state.pc + 2];
            break;
        case 0xcc:
            // Opcode = CZ; Size = 3
            opcodeName = 'CZ';
            opcodeBytes = 3;
            dst = state.memory[state.pc + 1];
            src = state.memory[state.pc + 2];
            break;
        case 0xcd:
            // Opcode = CALL; Size = 3
            opcodeName = 'CALL';
            opcodeBytes = 3;
            dst = state.memory[state.pc + 1];
            src = state.memory[state.pc + 2];
            break;
        case 0xce:
            // Opcode = ACI; Size = 2
            opcodeName = 'ACI';
            opcodeBytes = 2;
            src = state.memory[state.pc + 1];
            
            var answer = state.a + src + state.cc.cy;
            state.cc.z = ((answer & 0xff) == 0);
            state.cc.s = ((answer & 0x80) != 0);
            state.cc.cy = (answer > 0xff);
            state.cc.p = Parity(answer & 0xff);
            state.a = answer & 0xff;
            console.log(state);
            break;
            break;
        case 0xd0:
            // Opcode = RNC; Size = 1
            opcodeName = 'RNC';
            opcodeBytes = 1;
            break;
        case 0xd2:
            // Opcode = JNC; Size = 3
            opcodeName = 'JNC';
            opcodeBytes = 3;
            dst = state.memory[state.pc + 1];
            src = state.memory[state.pc + 2];
            break;
        case 0xd3:
            // Opcode = OUT; Size = 2
            opcodeName = 'OUT';
            opcodeBytes = 2;
            src = state.memory[state.pc + 1];
            break;
        case 0xd4:
            // Opcode = CNC; Size = 3
            opcodeName = 'CNC';
            opcodeBytes = 3;
            dst = state.memory[state.pc + 1];
            src = state.memory[state.pc + 2];
            break;
        case 0xd6:
            // Opcode = SUI; Size = 2
            opcodeName = 'SUI';
            opcodeBytes = 2;
            src = state.memory[state.pc + 1];
            break;
        case 0xd8:
            // Opcode = RC; Size = 1
            opcodeName = 'RC';
            opcodeBytes = 1;
            break;
        case 0xda:
            // Opcode = JC; Size = 3
            opcodeName = 'JC';
            opcodeBytes = 3;
            dst = state.memory[state.pc + 1];
            src = state.memory[state.pc + 2];
            break;
        case 0xdb:
            // Opcode = IN; Size = 2
            opcodeName = 'IN';
            opcodeBytes = 2;
            src = state.memory[state.pc + 1];
            break;
        case 0xdc:
            // Opcode = CC; Size = 3
            opcodeName = 'CC';
            opcodeBytes = 3;
            dst = state.memory[state.pc + 1];
            src = state.memory[state.pc + 2];
            break;
        case 0xde:
            // Opcode = SBI; Size = 2
            opcodeName = 'SBI';
            opcodeBytes = 2;
            src = state.memory[state.pc + 1];
            break;
        case 0xe0:
            // Opcode = RPO; Size = 1
            opcodeName = 'RPO';
            opcodeBytes = 1;
            break;
        case 0xe2:
            // Opcode = JPO; Size = 3
            opcodeName = 'JPO';
            opcodeBytes = 3;
            dst = state.memory[state.pc + 1];
            src = state.memory[state.pc + 2];
            break;
        case 0xe3:
            // Opcode = XTHL; Size = 1
            opcodeName = 'XTHL';
            opcodeBytes = 1;
            break;
        case 0xe4:
            // Opcode = CPO; Size = 3
            opcodeName = 'CPO';
            opcodeBytes = 3;
            dst = state.memory[state.pc + 1];
            src = state.memory[state.pc + 2];
            break;
        case 0xe6:
            // Opcode = ANI; Size = 2
            opcodeName = 'ANI';
            opcodeBytes = 2;
            src = state.memory[state.pc + 1];
            break;
        case 0xe8:
            // Opcode = RPE; Size = 1
            opcodeName = 'RPE';
            opcodeBytes = 1;
            break;
        case 0xe9:
            // Opcode = PCHL; Size = 1
            opcodeName = 'PCHL';
            opcodeBytes = 1;
            break;
        case 0xea:
            // Opcode = JPE; Size = 3
            opcodeName = 'JPE';
            opcodeBytes = 3;
            dst = state.memory[state.pc + 1];
            src = state.memory[state.pc + 2];
            break;
        case 0xeb:
            // Opcode = XCHG; Size = 1
            opcodeName = 'XCHG';
            opcodeBytes = 1;
            break;
        case 0xec:
            // Opcode = CPE; Size = 3
            opcodeName = 'CPE';
            opcodeBytes = 3;
            dst = state.memory[state.pc + 1];
            src = state.memory[state.pc + 2];
            break;
        case 0xee:
            // Opcode = XRI; Size = 2
            opcodeName = 'XRI';
            opcodeBytes = 2;
            src = state.memory[state.pc + 1];
            break;
        case 0xf0:
            // Opcode = RP; Size = 1
            opcodeName = 'RP';
            opcodeBytes = 1;
            break;
        case 0xf2:
            // Opcode = JP; Size = 3
            opcodeName = 'JP';
            opcodeBytes = 3;
            dst = state.memory[state.pc + 1];
            src = state.memory[state.pc + 2];
            break;
        case 0xf3:
            // Opcode = DI; Size = 1
            opcodeName = 'DI';
            opcodeBytes = 1;
            break;
        case 0xf4:
            // Opcode = CP; Size = 3
            opcodeName = 'CP';
            opcodeBytes = 3;
            dst = state.memory[state.pc + 1];
            src = state.memory[state.pc + 2];
            break;
        case 0xf6:
            // Opcode = ORI; Size = 2
            opcodeName = 'ORI';
            opcodeBytes = 2;
            src = state.memory[state.pc + 1];
            break;
        case 0xf8:
            // Opcode = RM; Size = 1
            opcodeName = 'RM';
            opcodeBytes = 1;
            break;
        case 0xf9:
            // Opcode = SPHL; Size = 1
            opcodeName = 'SPHL';
            opcodeBytes = 1;
            break;
        case 0xfa:
            // Opcode = JM; Size = 3
            opcodeName = 'JM';
            opcodeBytes = 3;
            dst = state.memory[state.pc + 1];
            src = state.memory[state.pc + 2];
            break;
        case 0xfb:
            // Opcode = EI; Size = 1
            opcodeName = 'EI';
            opcodeBytes = 1;
            break;
        case 0xfc:
            // Opcode = CM; Size = 3
            opcodeName = 'CM';
            opcodeBytes = 3;
            dst = state.memory[state.pc + 1];
            src = state.memory[state.pc + 2];
            break;
        case 0xfe:
            // Opcode = CPI; Size = 2
            opcodeName = 'CPI';
            opcodeBytes = 2;
            src = state.memory[state.pc + 1];
            break;
        default:
            break;
    }
    console.log('Address = $' + state.pc.toString(16).padStart(4, '0') + '    ' + opcodeName);
    state.pc += opcodeBytes;
}

// Read program with PC = 0
var programCounter = 0;
var codeBuffer = loadCode();
//console.log(codeBuffer);

// For state initialization
class ConditionCodes {
    // (1-byte) Condition codes
    constructor() {
        // Each flag used 1-bit
        this.z = 0;
        this.s = 0;
        this.p = 0;
        this.cy = 0;
        this.ac = 0;
        this.pad_1 = 0;
        this.pad_2 = 0;
        this.pad_3 = 0;
    }
}
class State {
    constructor(memory) {
        // 1-byte registers
        this.a = 0;
        this.b = 0;
        this.c = 0;
        this.d = 0;
        this.e = 0;

        // 2-bytes registers
        this.h = 0;
        this.l = 0;

        // (2-byte) Stack pointer / program counter
        this.sp = 0;
        this.pc = 0;

        // Memory buffer (from loaded file)
        this.memory = memory;

        // Condition codes (All using the same byte)
        this.cc = new ConditionCodes();
    }
}

var state = new State(codeBuffer);

for (var i = 0; i < 5; i++) {
    update(state);
};

