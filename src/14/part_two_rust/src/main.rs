use regex::Regex;
use std::collections::HashMap;
use std::fs;

fn main() {
    let input = read_file("./src/input.txt");
    let data = parse_data(input);
    let sum = complete_instructions(data);

    println!("Part two solution: {sum}");
}

fn complete_instructions(data: Data) -> i64 {
    let mut memory: HashMap<i64, Vec<i64>> = HashMap::new();
    let mut mask: Mask = Mask {
        floating_mask: 0,
        ones_mask: 0,
    };

    for command in data {
        match command {
            Either::Left(command) => {
                mask.ones_mask = command.ones_mask;
                mask.floating_mask = command.floating_mask;
            }
            Either::Right(command) => {
                let with_ones = command.value | mask.ones_mask;
                let masked_values = resolve_floating_bits(with_ones, mask.floating_mask);

                memory.insert(command.place, masked_values);
            }
        }
    }

    return memory.values().flatten().sum::<i64>();
}

fn resolve_floating_bits(value: i64, floating_mask: i64) -> Vec<i64> {
    let mask_variations = split_floating_mask(floating_mask);
    return apply_masks(vec![value], mask_variations);
}

// Splits  0010010 into vector of
//         0010000 and
//         0000010
fn split_floating_mask(floating_mask: i64) -> Vec<i64> {
    let mut masks = Vec::new();

    let mut index: u32 = 0;

    let mut sliding_mask = floating_mask;
    while sliding_mask > 0 {
        if sliding_mask % 2 == 1 {
            masks.push(2_i64.pow(index));
        }
        index = index + 1;
        sliding_mask = ((sliding_mask as u64) >> 1) as i64;
    }

    return masks;
}

fn apply_masks(values: Vec<i64>, masks: Vec<i64>) -> Vec<i64> {
    if masks.len() <= 0 {
        return values;
    } else {
        let current_mask = masks.first().unwrap();
        let new_masks = Vec::from(&masks[1..]);
        let new_values = values
            .iter()
            .map(|val: &i64| {
                let with_zeros = val | current_mask;
                let with_ones = (val | current_mask) - current_mask;

                return Vec::from([with_zeros, with_ones]);
            })
            .flatten()
            .collect();

        return apply_masks(new_values, new_masks);
    }
}

fn parse_data(input: String) -> Data {
    return input
        .trim()
        .lines()
        .map(|line| -> Either<Mask, Mem> {
            let is_mask_operation = line[..4] == "mask".to_string();

            if is_mask_operation {
                let mask_sring = line[7..].to_string();
                let floating_mask_str = mask_sring.replace("1", "0").replace("X", "1");
                let ones_mask_str = mask_sring.replace('X', "0");

                let floating_mask = i64::from_str_radix(&floating_mask_str, 2).unwrap();
                let ones_mask = i64::from_str_radix(&ones_mask_str, 2).unwrap();

                return Either::Left(Mask {
                    ones_mask,
                    floating_mask,
                });
            } else {
                let deliminators = Regex::new(r"mem\[|\] = ").unwrap();
                let parts: Vec<&str> = deliminators.split(line).collect();

                let place = parts[1].parse::<i64>().unwrap();
                let value = parts[2].parse::<i64>().unwrap();

                return Either::Right(Mem { place, value });
            }
        })
        .collect();
}

type Data = Vec<Either<Mask, Mem>>;
enum Either<L, R> {
    Left(L),
    Right(R),
}
struct Mask {
    floating_mask: i64,
    ones_mask: i64,
}

struct Mem {
    place: i64,
    value: i64,
}

fn read_file(path: &str) -> String {
    let contents = fs::read(path).expect("Could not find file");
    let file_content_string = String::from_utf8(contents).unwrap();

    return file_content_string;
}
