<?php

namespace Drupal\cwd_events\Plugin\Block;
use Drupal\Core\Block\BlockBase;
use Drupal\Core\Block\BlockPluginInterface;
use Drupal\Core\Form\FormStateInterface;


/*
      '#markup' => $this->t('Hello @name!', ['@name' => $name ])
*/

/**
 * Provides an Events Block containing Localist Data.
 *
 * @Block(
 *   id = "cwd_events_block",
 *   admin_label = @Translation("Events block"),
 *   category = @Translation("Events Block"),
 * )
 */
class EventsBlock extends BlockBase  implements BlockPluginInterface {
  //list of supported format options @todo add support for archive
  private $format_options = array(
    'standard'=>'standard',
    'compact'=>'compact',
    'inline_compact'=>'inline_compact',
    'modern_compact'=>'modern_compact',
    'modern_standard'=>'modern_standard',
    'simple_standard'=>'simple_standard',
    'simple_compact'=>'simple_compact',
    'archive'=>'archive'
  );

  /**
   * {@inheritdoc}
   */
  public function build() {
    $teaser = $this->configuration['cwd_events_readmore']?'<a class="cwd_events_readmore" href='.$this->configuration['cwd_events_url'].'>'.$this->configuration['cwd_events_readmore'].'</a>':'';
    //generate a unique id
    $uuid = \Drupal::service('uuid');
    $id = $uuid->generate();
    return [
      '#attached' => ['library' => ["cwd_events/cwdeventslib"]],
      '#markup' => $this->t($teaser."<div id='@target' class='events-listing' ></div>
        <script>
      var settings = {
        'target':'@target',
        'depts':@depts,
        'entries':@entries,
        'format':'@format',
        'group':@group,
        'singleday':@singleday,
        'keyword':'@keyword',
        'addCal': true,
        'heading':''};
      if (CWD_LocalList){
      CWD_LocalList.run( settings );
      }else{
        console.warn('ERROR: can not find events buid');
      }</script>",
      	[
          "@target"=>"events-listing-".$id,
      		"@depts" => $this->configuration['cwd_events_depts'],
      		"@entries" =>  $this->configuration['cwd_events_entries'],
      		"@format" =>  $this->configuration['cwd_events_format'],
      		"@group" =>  $this->configuration['cwd_events_group'],
      		"@singleday" =>  $this->configuration['cwd_events_singleday'] ? 'true' : 'false',
      		"@keyword" =>  $this->configuration['cwd_events_keyword']
      	]),
    ];
  }

/*
function renderEvents(target, depts, entries, format, group, singleday, keyword) {
    depts = (typeof depts === 'undefined') ? 0 : depts;
    entries = (typeof entries === 'undefined') ? 3 : entries;
    format = (typeof format === 'undefined') ? 'standard' : format;
    group = (typeof group === 'undefined') ? 0 : group;
    singleday = (typeof singleday === 'undefined') ? false : singleday;
    keyword = (typeof keyword === 'undefined') ? false : keyword;
 */


  /**
   * {@inheritdoc}
   */
  public function blockForm($form, FormStateInterface $form_state) {
    $form = parent::blockForm($form, $form_state);
    $config = $this->getConfiguration();
    $format_options = $this->format_options;

    $form['cwd_events_readmore'] = [
      '#type' => 'textfield',
      '#title' => $this->t('Read More Title'),
      '#description' => $this->t('Read More Title to be used with readmore url to link to the events page. Leave blank to remove from display.'),
      '#default_value' => isset($config['cwd_events_readmore']) ? $config['cwd_events_readmore'] : 'Read More',
    ];

    $form['cwd_events_url'] = [
      '#type' => 'textfield',
      '#title' => $this->t('Read More URL'),
      '#description' => $this->t('The Read More URL, provides href to main events page used in read more title.'),
      '#default_value' => isset($config['cwd_events_url']) ? $config['cwd_events_url'] : '/events',
    ];


    $form['cwd_events_depts'] = [
      '#type' => 'textfield',
      '#title' => $this->t('Departments'),
      '#description' => $this->t('The department to include by ID'),
      '#default_value' => isset($config['cwd_events_depts']) ? $config['cwd_events_depts'] : 0,
    ];

    $form['cwd_events_entries'] = [
      '#type' => 'number',
      '#title' => $this->t('Entries'),
      '#description' => $this->t('Max number of entries to display, up to 100'),
      '#default_value' => isset($config['cwd_events_entries']) ? $config['cwd_events_entries'] : 3,
    ];


    $form['cwd_events_format'] = [
      '#type' => 'select',
      '#title' => $this->t('Format'),
      '#description' => $this->t('Choices are: standard (default), compact (omit thumbnail, type and end time), archive (past events in reverse order), calendar (date on left)'),
      '#options' => $format_options,
      '#default_value' => isset($config['cwd_events_format']) ? $config['cwd_events_format'] : 'standard',
    ];

    $form['cwd_events_group'] = [
      '#type' => 'textfield',
      '#title' => $this->t('Group'),
      '#description' => $this->t('Localist filter option'),
      '#default_value' => isset($config['cwd_events_group']) ? $config['cwd_events_group'] : 0,
    ];

    $form['cwd_events_singleday'] = [
      '#type' => 'boolean',
      '#title' => $this->t('Single Day'),
      '#description' => $this->t('Format is YYYY-MM-DD to limit to specific day'),
      '#default_value' => isset($config['cwd_events_singleday']) ? $config['cwd_events_singleday'] : false,
    ];

    $form['cwd_events_keyword'] = [
      '#type' => 'textfield',
      '#title' => $this->t('Keyword'),
      '#description' => $this->t('Display events with a specific tag or keyword (can be used alone or in combination with "depts" and "group")'),
      '#default_value' => isset($config['cwd_events_keyword']) ? $config['cwd_events_keyword'] : false,
    ];

    return $form;
  }

  /**
   * {@inheritdoc}
   */
  public function blockSubmit($form, FormStateInterface $form_state) {
    parent::blockSubmit($form, $form_state);
    $values = $form_state->getValues();
    $format_options = $this->format_options;
    $this->configuration['cwd_events_readmore'] = $values['cwd_events_readmore'];
    $this->configuration['cwd_events_url'] = $values['cwd_events_url'];
    $this->configuration['cwd_events_depts'] = $values['cwd_events_depts'];
    $this->configuration['cwd_events_entries'] = $values['cwd_events_entries'];
    $this->configuration['cwd_events_format'] = $format_options[$values['cwd_events_format']];
    $this->configuration['cwd_events_group'] = $values['cwd_events_group'];
    $this->configuration['cwd_events_singleday'] = $values['cwd_events_singleday'];
    $this->configuration['cwd_events_keyword'] = $values['cwd_events_keyword'];
  }


}
