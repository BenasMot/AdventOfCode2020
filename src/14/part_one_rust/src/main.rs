use regex::Regex;
use std::collections::HashMap;
use std::fs;

fn main() {
    let input = read_file("./src/input.txt");
    let data = parse_data(input);
    let sum = complete_instructions(data);

    println!("Part one solution: {sum}");
}

fn complete_instructions(data: Data) -> i64 {
    let mut memory: HashMap<i64, i64> = HashMap::new();
    let mut mask: Mask = Mask {
        zeros_mask: 0,
        ones_mask: 0,
    };

    for command in data {
        match command {
            Either::Left(command) => {
                mask.ones_mask = command.ones_mask;
                mask.zeros_mask = command.zeros_mask;
            }
            Either::Right(command) => {
                let with_ones = command.value | mask.ones_mask;
                let with_ones_and_zeros = with_ones - (with_ones & mask.zeros_mask);
                memory.insert(command.place, with_ones_and_zeros);
            }
        }
    }

    return memory.values() .sum::<i64>();
}

fn parse_data(input: String) -> Data {
    return input
        .trim()
        .lines()
        .map(|line| -> Either<Mask, Mem> {
            let is_mask_operation = line[..4] == "mask".to_string();

            if is_mask_operation {
                let mask_sring = line[7..].to_string();
                let zeros_mask_str = mask_sring
                    .replace("1", "X")
                    .replace("0", "1")
                    .replace("X", "0");
                let ones_mask_str = mask_sring.replace('X', "0");

                let zeros_mask = i64::from_str_radix(&zeros_mask_str, 2).unwrap();
                let ones_mask = i64::from_str_radix(&ones_mask_str, 2).unwrap();

                return Either::Left(Mask {
                    ones_mask,
                    zeros_mask,
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
    zeros_mask: i64,
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
