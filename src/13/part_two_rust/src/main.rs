use std::fs;

fn main() {
    solve_for("src/input.txt");
}

fn solve_for(source: &str) {
    let input = read_file(source);
    let notes = parse_notes(input);
    let departure_time = get_earliest_subsequent_departures_time(notes);

    println!("{departure_time}");
}

#[derive(Debug)]
struct Bus {
    id: i128,
    delay: i128,
}

struct Notes {
    busses: Vec<Bus>,
}

fn read_file(path: &str) -> String {
    let contents = fs::read(path).expect("Couldn't read file");
    let file_content_string = String::from_utf8(contents).unwrap();

    return file_content_string;
}

fn parse_notes(input: String) -> Notes {
    let mut lines = input.trim().lines();
    lines.next();
    let timetable = lines.next().unwrap();

    let busses = timetable
        .split(',')
        .enumerate()
        .map(|(index, id)| {
            return Bus {
                id: if id == 'x'.to_string() {
                    0
                } else {
                    id.parse::<i128>().unwrap()
                },
                delay: index as i128,
            };
        })
        .filter(|bus| bus.id != 0)
        .collect::<Vec<Bus>>();

    return Notes { busses };
}

fn get_earliest_subsequent_departures_time(notes: Notes) -> i128 {
    let mut ans = 0;
    let busses = notes.busses;

    let mut guess = 0;

    while ans == 0 {
        let mut has_answer = true;
        for bus in busses.iter() {
            let sum = guess + bus.delay - bus.id * ((guess + bus.delay) / bus.id);
            if sum != 0 {
                has_answer = false;
                break;
            }
        }

        if has_answer == true {
            ans = guess;
        }
        guess = guess + busses[0].id;
    }
    return ans;
}
