const eyeColors = ['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth'] as const;
type EyeColor = typeof eyeColors[number];

interface Data {
  byr?: number; // (Birth Year)
  iyr?: number; // (Issue Year)
  eyr?: number; // (Expiration Year)
  hgt?: string; // (Height)
  hcl?: string; // (Hair Color)
  ecl?: string; // (Eye Color)
  pid?: string; // (Passport ID)
  cid?: string; // (Country ID)
}

interface Passport {
  byr: number; // (Birth Year)
  iyr: number; // (Issue Year)
  eyr: number; // (Expiration Year)
  hgt: string; // (Height)
  hcl: string; // (Hair Color)
  ecl: string; // (Eye Color)
  pid: string; // (Passport ID)
  cid?: string; // (Country ID)
}

interface ValidPassport {
  byr: number; // (Birth Year)
  iyr: number; // (Issue Year)
  eyr: number; // (Expiration Year)
  hgt: string; // (Height)
  hcl: string; // (Hair Color)
  ecl: EyeColor; // (Eye Color)
  pid: string; // (Passport ID)
  cid?: string; // (Country ID)
}

const hasRequiredFields = (passport: Data): passport is Passport => {
  const keys = Object.keys(passport);
  const hasCID = keys.includes('cid');
  const hasRequiredFields = keys.length === 8 || (keys.length === 7 && !hasCID);
  return hasRequiredFields;
};

const isHeightValid = (hgt: string) => {
  const hgtCm = Number(hgt.slice(0, 3));
  const validHgtInCm = hgt.length === 5 && hgt.slice(3) === 'cm' && hgtCm >= 150 && hgtCm <= 193;
  const hgtIn = Number(hgt.slice(0, 2));
  const validHgtInInches = hgt.length === 4 && hgt.slice(2) == 'in' && hgtIn >= 59 && hgtIn <= 76;

  return validHgtInCm || validHgtInInches;
};

const isHexEightBit = (str: string) => {
  const num = parseInt(str, 16);
  return 0 <= num && num <= 16777215;
};

const isECL = (str: any): str is EyeColor => {
  return eyeColors.includes(str);
};

const isValid = (passport: Data): passport is ValidPassport => {
  const hasFields = hasRequiredFields(passport);
  if (hasFields) {
    const validByr = passport.byr <= 2002 && passport.byr >= 1920;
    const validIYR = passport.iyr <= 2020 && passport.iyr >= 2010;
    const validEYR = passport.eyr <= 2030 && passport.eyr >= 2020;
    const validPID = passport.pid.length === 9 && !isNaN(+passport.pid);
    const validHCL = passport.hcl[0] === '#' && isHexEightBit(passport.hcl.slice(1)) && passport.hcl.length - 1 === 6;
    const validECL = isECL(passport.ecl);
    const validHGT = isHeightValid(passport.hgt);

    return validByr && validIYR && validEYR && validPID && validHCL && validHGT && validECL;
  }
  return false;
};

export const parsePassports = (input: string): Data[] => {
  const unparsedPassports = input.split('\n\n');
  const passports = unparsedPassports.map((info) => {
    let passport: Data = {};
    const fields = info.split(/ |\n/);
    fields.forEach((field) => {
      const [key, value] = field.split(':');
      if (key) {
        passport = {...passport, [key]: value};
      }
    });
    return passport;
  });
  return passports;
};

export const countAcceptablePassports = (data: Data[]) => {
  const count = data.filter(hasRequiredFields).length;
  return count;
};

export const countValidPassports = (data: Data[]) => {
  const count = data.filter(isValid).length;
  return count;
};
