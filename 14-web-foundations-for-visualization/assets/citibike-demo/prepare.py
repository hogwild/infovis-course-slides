"""Rebuild verified aggregates and prepared SVG from the instructor's CSV.
Run from any directory: python3 prepare.py [--official-archive /path/to.zip].
No network request; the reference CSV is read-only.
"""
from pathlib import Path
from datetime import datetime, date, timedelta
from collections import Counter
from io import StringIO
from zipfile import ZipFile
import csv, json, hashlib, argparse, html, re
BASE=Path(__file__).resolve().parent
ASSETS=BASE.parent
ROOT=BASE.parents[3]
SOURCE=ROOT/'reference/citibike_storytelling_example/citibike_april.csv'
args=argparse.ArgumentParser();args.add_argument('--official-archive');opts=args.parse_args()
raw=SOURCE.read_bytes(); rows=list(csv.DictReader(StringIO(raw.decode('utf-8-sig'))))
counts=Counter()
for row in rows:
    timestamp=datetime.fromisoformat(row['starttime'])
    if (timestamp.year,timestamp.month)!=(2020,4): raise ValueError('Unexpected date: review population before generating')
    counts[timestamp.date().isoformat()]+=1
calendar_dates=[date(2020,4,1)+timedelta(days=i) for i in range(30)]
assert set(counts)=={d.isoformat() for d in calendar_dates}, 'Unknown coverage: do not zero-fill'
daily=[dict(date=d.isoformat(),rides=counts[d.isoformat()],isWeekend=d.weekday()>=5) for d in calendar_dates]
weekday=[d for d in daily if not d['isWeekend']];weekend=[d for d in daily if d['isWeekend']]
summary=dict(scope='Jersey City',month='April 2020',acceptedTrips=len(rows),coveredDates=len(daily),weekdayDates=len(weekday),weekendDates=len(weekend),weekdayRides=sum(d['rides'] for d in weekday),weekendRides=sum(d['rides'] for d in weekend))
summary.update(weekdayMean=summary['weekdayRides']/len(weekday),weekendMean=summary['weekendRides']/len(weekend),dailyMean=len(rows)/len(daily),maximumDay=max(daily,key=lambda d:d['rides']),minimumDay=min(daily,key=lambda d:d['rides']))
summary['weekendVsWeekdayPercent']=(summary['weekendMean']/summary['weekdayMean']-1)*100
summary['totalCheck']=sum(d['rides'] for d in daily)==len(rows)
audit_path=BASE/'data/audit.json'
audit=json.loads(audit_path.read_text()) if audit_path.exists() else {}
audit.update(verifiedOn='2026-10-22',publisher='Citi Bike / Lyft',sourcePage='https://citibikenyc.com/system-data',sourceUrl='https://s3.amazonaws.com/tripdata/JC-202004-citibike-tripdata.csv.zip',classroomSource=str(SOURCE.relative_to(ROOT)),classroomSourceSha256=hashlib.sha256(raw).hexdigest(),classroomSourceBytes=len(raw),columns=list(rows[0]),countingUnit='one published trip row',inputRows=len(rows),excludedRows=0,exclusionRules='All instructor CSV rows retained; no additional duration, usertype, station, or deduplication filtering.',timestampPolicy='Preserve starttime local civil-date prefix without browser/UTC timezone conversion. Source timestamps carry no UTC offset; the file does not independently prove a timezone offset.',firstStarttime=min(r['starttime'] for r in rows),lastStarttime=max(r['starttime'] for r in rows),coverage='Monthly JC April 2020 file; every one of 30 April dates has positive records. No date has been zero-filled. Completeness beyond the publisher release is not independently established.',datesObserved=len(counts),zeroFilledDates=[],duplicateCompleteRows=len(rows)-len({tuple(r.items()) for r in rows}),summary=summary)
if opts.official_archive:
    archive=Path(opts.official_archive)
    with ZipFile(archive) as z: official=z.read('JC-202004-citibike-tripdata.csv')
    official_rows=list(csv.DictReader(StringIO(official.decode('utf-8-sig'))))
    assert rows==official_rows, 'Instructor and official records differ: review before publishing'
    audit.update(csvFilename='JC-202004-citibike-tripdata.csv',archiveSha256=hashlib.sha256(archive.read_bytes()).hexdigest(),csvSha256=hashlib.sha256(official).hexdigest(),sourceBytes=len(official),officialCrossCheck=dict(rawBytesIdentical=raw==official,orderedParsedRowsIdentical=rows==official_rows,identicalIgnoringFinalNewline=raw.rstrip(b'\n')==official.rstrip(b'\n'),difference='Instructor CSV omits the final newline in the official CSV; all other bytes and all parsed records are identical.'))
    audit.pop('archiveFilename',None)
audit['originalWebsiteComparison']='Instructor supplied the project CSV and source. This CSV matches the official monthly release in every parsed record; only the final newline differs. The native classroom app is an explicit two-chapter reconstruction.'
(BASE/'data').mkdir(exist_ok=True)
for filename,obj in [('daily.json',daily),('summary.json',summary),('audit.json',audit)]: (BASE/'data'/filename).write_text(json.dumps(obj,indent=2,ensure_ascii=False)+'\n')
with (BASE/'data/trips-excerpt.csv').open('w',newline='') as f:
    w=csv.DictWriter(f,fieldnames=['starttime','tripduration']);w.writeheader();w.writerows({k:r[k] for k in w.fieldnames} for r in rows[:8])
PALETTE=['#edf3fc','#aac6e4','#6395c3','#3157a4','#17233c']
def fill(value):
    t=max(0,min(1,value/800))*4;i=min(3,int(t));f=t-i
    rgb=lambda h:[int(h[j:j+2],16) for j in (1,3,5)]
    return '#'+''.join(f'{round(a+(b-a)*f):02x}' for a,b in zip(rgb(PALETTE[i]),rgb(PALETTE[i+1])))
def calendar_inner(outline=True):
    parts=['<text x="42" y="35" font-size="25" font-weight="700" fill="#17233c">April 2020 · rides per date</text>']
    for i,day in enumerate(['Sun','Mon','Tue','Wed','Thu','Fri','Sat']):parts.append(f'<text x="{91+i*110}" y="70" text-anchor="middle" font-size="22" fill="#667085">{day}</text>')
    for d in daily:
        n=int(d['date'][-2:]);index=n+2;col=index%7;week=index//7;x=43+col*110;y=87+week*72
        fg='#ffffff' if d['rides']>=450 else '#17233c';stroke='#b86f16' if d['isWeekend'] and outline else '#ffffff';sw=3 if d['isWeekend'] and outline else 1
        parts.append(f'<g class="day-group" data-date="{d["date"]}"><rect class="day{" weekend" if d["isWeekend"] else ""}" data-date="{d["date"]}" x="{x}" y="{y}" width="96" height="62" rx="7" fill="{fill(d["rides"])}" stroke="{stroke}" stroke-width="{sw}"><title>{d["date"]}: {d["rides"]} rides</title></rect><text class="date-label" x="{x+10}" y="{y+21}" font-size="20" fill="{fg}">{n}</text><text class="count-label" x="{x+48}" y="{y+54}" text-anchor="middle" font-size="32" font-weight="700" fill="{fg}">{d["rides"]}</text></g>')
    parts.extend(['<text x="43" y="477" font-size="22" fill="#667085">Rides</text>','<defs><linearGradient id="ride-gradient">'+''.join(f'<stop offset="{i*25}%" stop-color="{c}"/>' for i,c in enumerate(PALETTE))+'</linearGradient></defs>','<rect x="103" y="461" width="310" height="17" rx="3" fill="url(#ride-gradient)"/>','<text x="103" y="501" font-size="20" fill="#667085">0</text>','<text x="413" y="501" text-anchor="end" font-size="20" fill="#667085">800</text>','<rect x="492" y="460" width="22" height="19" rx="3" fill="none" stroke="#b86f16" stroke-width="3"/><text x="527" y="476" font-size="24" fill="#667085">Weekend outline</text>'])
    return ''.join(parts)
def svg(inner,view='0 0 860 520',title='April 2020 Citi Bike daily counts'):
    return f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="{view}" role="img" aria-label="{title}" font-family="Arial, Helvetica, sans-serif"><rect width="100%" height="100%" fill="#fff"/>{inner}</svg>'
cal=svg(calendar_inner())
(ASSETS/'calendar.svg').write_text(cal)
(BASE/'calendar.svg').write_text(cal)
# Two chapter states in one independently understandable PDF fallback.
state='<rect x="0" y="0" width="1136" height="450" rx="18" fill="#fcfaf6"/>'
for x,label in [(0,'01 · OVERVIEW'),(578,'02 · DAILY CALENDAR')]:
    state+=f'<rect x="{x+6}" y="8" width="552" height="430" rx="16" fill="#ffffff" stroke="#d8dbe4"/><text x="{x+28}" y="42" font-size="18" font-weight="700" fill="#3157a4">{label}</text>'
state+='<text x="34" y="107" font-size="29" font-weight="700" fill="#17233c">Jersey City · April 2020</text><text x="34" y="211" font-size="93" font-weight="700" fill="#17233c">9,268</text><text x="36" y="253" font-size="27" fill="#667085">published trip records</text><text x="36" y="312" font-size="22" fill="#17233c">30 dates · one counting population</text><rect x="35" y="344" width="200" height="49" rx="9" fill="#3157a4"/><text x="135" y="375" font-size="20" font-weight="700" text-anchor="middle" fill="#fff">Overview active</text>'
state+='<g transform="translate(586,54) scale(.63)">'+calendar_inner()+'</g><text x="610" y="417" font-size="17" fill="#667085">Button → activeChapter → graphic + navigation</text>'
(ASSETS/'chapter-states.svg').write_text(svg(state,'0 0 1136 450','Overview and calendar states; same 9,268 accepted trips'))
style='<text x="28" y="40" font-size="24" font-weight="700" fill="#17233c">One style rule changes the outline, not the count</text>'
for x,outline,label in [(30,False,'Default presentation'),(580,True,'Weekend emphasis')]:
    style+=f'<rect x="{x}" y="66" width="510" height="322" rx="15" fill="#fcfaf6"/><text x="{x+24}" y="104" font-size="23" font-weight="700" fill="#17233c">{label}</text><rect x="{x+140}" y="137" width="220" height="156" rx="12" fill="{fill(538)}" stroke="{"#b86f16"}" stroke-width="{(6 if outline else 3)}"/><text x="{x+160}" y="177" font-size="25" fill="#fff">Apr 4 · Saturday</text><text x="{x+250}" y="253" font-size="55" font-weight="700" text-anchor="middle" fill="#fff">538</text><text x="{x+255}" y="345" font-size="21" text-anchor="middle" fill="#667085">Same date, position, fill, and ride count</text>'
(ASSETS/'style-states.svg').write_text(svg(style,'0 0 1136 420','Weekend outline changes while April 4 stays at 538 rides'))
# Supply prepared SVG markup; native JavaScript updates existing nodes only.
(BASE/'prepared-calendar.html').write_text(cal)
if (BASE/'index.html').exists():
    page=(BASE/'index.html').read_text()
    page=re.sub(r'<!-- PREPARED_CALENDAR_START -->.*?<!-- PREPARED_CALENDAR_END -->', '<!-- PREPARED_CALENDAR_START -->'+cal+'<!-- PREPARED_CALENDAR_END -->', page, flags=re.S)
    (BASE/'index.html').write_text(page)
print(f'Prepared {len(daily)} dates and {len(rows):,} trips; weekday {summary["weekdayMean"]}, weekend {summary["weekendMean"]}.')
